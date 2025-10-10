import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  Pressable, 
  Image, 
  Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../state/appStore';
import { Listing, ClothingCategory, ClothingSize } from '../types/models';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  ProductDetail: { listing: Listing };
  Search: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / 2;

const CATEGORIES: ClothingCategory[] = ['tops', 'bottoms', 'dresses', 'outerwear', 'accessories', 'shoes', 'other'];
const SIZES: ClothingSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];

export default function SearchScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<ClothingCategory[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<ClothingSize[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 1000 });
  
  const listings = useAppStore(state => state.listings);
  const likedListings = useAppStore(state => state.likedListings);
  const toggleLike = useAppStore(state => state.toggleLike);
  const incrementViews = useAppStore(state => state.incrementViews);
  
  const toggleCategory = (category: ClothingCategory) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const toggleSize = (size: ClothingSize) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };
  
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setPriceRange({ min: 0, max: 1000 });
  };
  
  // Filter listings
  const filteredListings = listings.filter(listing => {
    if (listing.isSold) return false;
    
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(listing.category);
    const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(listing.size);
    const matchesPrice = listing.price >= priceRange.min && listing.price <= priceRange.max;
    
    return matchesSearch && matchesCategory && matchesSize && matchesPrice;
  });
  
  const handleListingPress = (listing: Listing) => {
    incrementViews(listing.id);
    navigation.navigate('ProductDetail', { listing });
  };
  
  const handleLikePress = (listingId: string) => {
    toggleLike(listingId);
  };
  
  const activeFiltersCount = selectedCategories.length + selectedSizes.length;
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 pb-3 border-b border-gray-200">
        <View className="flex-row items-center mb-3">
          <Pressable onPress={() => navigation.goBack()} className="mr-3">
            <Ionicons name="arrow-back" size={24} color="#000" />
          </Pressable>
          <Text className="text-2xl font-bold flex-1">Search</Text>
        </View>
        
        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-3">
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search upcycled clothing..."
            placeholderTextColor="#9CA3AF"
            className="ml-2 flex-1 text-gray-900"
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </Pressable>
          )}
        </View>
      </View>
      
      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="border-b border-gray-200 px-4 py-3">
        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <Pressable 
            onPress={clearFilters}
            className="bg-red-50 border border-red-200 rounded-full px-4 py-2 mr-2 flex-row items-center"
          >
            <Ionicons name="close" size={16} color="#EF4444" />
            <Text className="text-red-600 font-medium ml-1">Clear ({activeFiltersCount})</Text>
          </Pressable>
        )}
        
        {/* Category Filters */}
        {CATEGORIES.map(category => {
          const isSelected = selectedCategories.includes(category);
          return (
            <Pressable
              key={category}
              onPress={() => toggleCategory(category)}
              className={`rounded-full px-4 py-2 mr-2 ${
                isSelected ? 'bg-black' : 'bg-gray-100'
              }`}
            >
              <Text 
                className={`font-medium capitalize ${
                  isSelected ? 'text-white' : 'text-gray-700'
                }`}
              >
                {category}
              </Text>
            </Pressable>
          );
        })}
        
        {/* Size Filters */}
        {SIZES.map(size => {
          const isSelected = selectedSizes.includes(size);
          return (
            <Pressable
              key={size}
              onPress={() => toggleSize(size)}
              className={`rounded-full px-4 py-2 mr-2 ${
                isSelected ? 'bg-emerald-600' : 'bg-gray-100'
              }`}
            >
              <Text 
                className={`font-medium ${
                  isSelected ? 'text-white' : 'text-gray-700'
                }`}
              >
                {size}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
      
      {/* Results Count */}
      <View className="px-4 py-3 bg-gray-50">
        <Text className="text-gray-700 font-medium">
          {filteredListings.length} {filteredListings.length === 1 ? 'item' : 'items'} found
        </Text>
      </View>
      
      {/* Listings Grid */}
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {filteredListings.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <Ionicons name="search-outline" size={64} color="#D1D5DB" />
            <Text className="text-gray-500 text-lg mt-4">No items found</Text>
            <Text className="text-gray-400 text-center mt-2 px-8">
              Try adjusting your search or filters
            </Text>
          </View>
        ) : (
          <View className="flex-row flex-wrap justify-between">
            {filteredListings.map(listing => {
              const isLiked = likedListings.includes(listing.id);
              
              return (
                <Pressable
                  key={listing.id}
                  onPress={() => handleListingPress(listing)}
                  className="mb-4"
                  style={{ width: ITEM_WIDTH }}
                >
                  <View className="relative">
                    <Image
                      source={{ uri: listing.images[0] }}
                      className="w-full rounded-xl bg-gray-200"
                      style={{ height: ITEM_WIDTH * 1.3 }}
                      resizeMode="cover"
                    />
                    
                    {/* Like Button */}
                    <Pressable
                      onPress={() => handleLikePress(listing.id)}
                      className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-sm"
                      style={{ elevation: 2 }}
                    >
                      <Ionicons 
                        name={isLiked ? 'heart' : 'heart-outline'} 
                        size={18} 
                        color={isLiked ? '#EF4444' : '#374151'}
                      />
                    </Pressable>
                  </View>
                  
                  <View className="mt-2">
                    <Text className="font-semibold text-gray-900" numberOfLines={1}>
                      {listing.title}
                    </Text>
                    <Text className="text-gray-500 text-xs mt-1">
                      Size {listing.size}
                    </Text>
                    <View className="flex-row items-center justify-between mt-1">
                      <Text className="font-bold text-gray-900">
                        ${listing.price}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        {listing.condition}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

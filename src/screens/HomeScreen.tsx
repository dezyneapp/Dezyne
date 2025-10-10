import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Pressable, 
  Image, 
  Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../state/appStore';
import { Listing, ClothingCategory } from '../types/models';
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

const CATEGORIES: { id: ClothingCategory | 'all', label: string, icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: 'all', label: 'All', icon: 'grid-outline' },
  { id: 'tops', label: 'Tops', icon: 'shirt-outline' },
  { id: 'bottoms', label: 'Bottoms', icon: 'business-outline' },
  { id: 'dresses', label: 'Dresses', icon: 'woman-outline' },
  { id: 'outerwear', label: 'Outerwear', icon: 'albums-outline' },
  { id: 'accessories', label: 'Accessories', icon: 'bag-outline' },
  { id: 'shoes', label: 'Shoes', icon: 'footsteps-outline' },
];

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [selectedCategory, setSelectedCategory] = useState<ClothingCategory | 'all'>('all');
  const [searchQuery] = useState('');
  
  const listings = useAppStore(state => state.listings);
  const likedListings = useAppStore(state => state.likedListings);
  const toggleLike = useAppStore(state => state.toggleLike);
  const incrementViews = useAppStore(state => state.incrementViews);
  
  // Filter listings
  const filteredListings = listings.filter(listing => {
    if (listing.isSold) return false;
    
    const matchesCategory = selectedCategory === 'all' || listing.category === selectedCategory;
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  const handleListingPress = (listing: Listing) => {
    incrementViews(listing.id);
    navigation.navigate('ProductDetail', { listing });
  };
  
  const handleLikePress = (listingId: string) => {
    toggleLike(listingId);
  };
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 pb-3 border-b border-gray-200">
        <Text className="text-3xl font-bold mb-3">Dezyne</Text>
        
        {/* Search Bar */}
        <Pressable 
          onPress={() => navigation.navigate('Search')}
          className="flex-row items-center bg-gray-100 rounded-full px-4 py-3 mb-3"
        >
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <Text className="ml-2 text-gray-500 flex-1">Search upcycled clothing...</Text>
        </Pressable>
        
        {/* Category Filters */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="flex-row -mx-2"
        >
          {CATEGORIES.map(category => (
            <Pressable
              key={category.id}
              onPress={() => setSelectedCategory(category.id)}
              className={`flex-row items-center px-4 py-2 rounded-full mx-1 ${
                selectedCategory === category.id 
                  ? 'bg-black' 
                  : 'bg-gray-100'
              }`}
            >
              <Ionicons 
                name={category.icon} 
                size={16} 
                color={selectedCategory === category.id ? '#FFFFFF' : '#374151'}
              />
              <Text 
                className={`ml-2 font-medium ${
                  selectedCategory === category.id 
                    ? 'text-white' 
                    : 'text-gray-700'
                }`}
              >
                {category.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      
      {/* Listings Grid */}
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {filteredListings.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <Ionicons name="shirt-outline" size={64} color="#D1D5DB" />
            <Text className="text-gray-500 text-lg mt-4">No items found</Text>
            <Text className="text-gray-400 text-center mt-2 px-8">
              Try adjusting your filters or check back later for new upcycled pieces
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
                    
                    {/* Upcycling Badge */}
                    <View className="absolute bottom-2 left-2 bg-black/80 rounded-full px-3 py-1">
                      <Text className="text-white text-xs font-medium">
                        Upcycled
                      </Text>
                    </View>
                  </View>
                  
                  <View className="mt-2">
                    <Text className="font-semibold text-gray-900" numberOfLines={1}>
                      {listing.title}
                    </Text>
                    <Text className="text-gray-500 text-xs mt-1">
                      {listing.sellerName}
                    </Text>
                    <View className="flex-row items-center justify-between mt-1">
                      <Text className="font-bold text-gray-900">
                        ${listing.price}
                      </Text>
                      <View className="flex-row items-center">
                        <Ionicons name="heart" size={12} color="#EF4444" />
                        <Text className="text-xs text-gray-500 ml-1">
                          {listing.likes}
                        </Text>
                      </View>
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

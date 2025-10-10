import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Pressable, 
  Image, 
  Share 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../state/appStore';
import { Listing } from '../types/models';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: { screen?: string };
  ProductDetail: { listing: Listing };
  Cart: undefined;
};

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProductDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ProductDetailRouteProp>();
  const { listing } = route.params;
  
  const likedListings = useAppStore(state => state.likedListings);
  const toggleLike = useAppStore(state => state.toggleLike);
  const addToCart = useAppStore(state => state.addToCart);
  const cart = useAppStore(state => state.cart);
  const currentUser = useAppStore(state => state.currentUser);
  
  const isLiked = likedListings.includes(listing.id);
  const isInCart = cart.some(item => item.listing.id === listing.id);
  const isSoldOut = listing.isSold;
  const isOwnListing = currentUser?.id === listing.sellerId;
  
  const handleAddToCart = () => {
    if (isSoldOut || isInCart || isOwnListing) return;
    addToCart(listing);
  };
  
  const handleViewCart = () => {
    // Navigate back to Home and switch to Cart tab
    navigation.navigate('Home', { screen: 'Cart' });
  };
  
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this upcycled item on Dezyne: ${listing.title} - $${listing.price}`,
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pb-3 border-b border-gray-200">
        <Pressable onPress={() => navigation.goBack()} className="p-2">
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <View className="flex-row items-center">
          <Pressable onPress={handleShare} className="p-2 mr-2">
            <Ionicons name="share-outline" size={24} color="#000" />
          </Pressable>
          <Pressable onPress={() => toggleLike(listing.id)} className="p-2">
            <Ionicons 
              name={isLiked ? 'heart' : 'heart-outline'} 
              size={24} 
              color={isLiked ? '#EF4444' : '#000'}
            />
          </Pressable>
        </View>
      </View>
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Image Carousel */}
        <ScrollView 
          horizontal 
          pagingEnabled 
          showsHorizontalScrollIndicator={false}
          className="h-96"
        >
          {listing.images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              className="w-screen h-96 bg-gray-200"
              resizeMode="cover"
            />
          ))}
        </ScrollView>
        
        <View className="px-4 py-4">
          {/* Price and Title */}
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            ${listing.price}
          </Text>
          <Text className="text-xl font-semibold text-gray-900 mb-1">
            {listing.title}
          </Text>
          
          {/* Seller Info */}
          <Pressable className="flex-row items-center py-3">
            <View className="w-10 h-10 rounded-full bg-gray-300 items-center justify-center">
              <Text className="text-lg font-semibold text-gray-700">
                {listing.sellerName[0]}
              </Text>
            </View>
            <View className="ml-3 flex-1">
              <Text className="font-semibold text-gray-900">{listing.sellerName}</Text>
              <View className="flex-row items-center">
                <Ionicons name="checkmark-circle" size={14} color="#10B981" />
                <Text className="text-xs text-gray-500 ml-1">Verified Upcycler</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </Pressable>
          
          {/* Stats */}
          <View className="flex-row py-3 border-t border-b border-gray-200 my-3">
            <View className="flex-1 items-center">
              <Text className="text-gray-500 text-sm">Views</Text>
              <Text className="font-semibold text-gray-900 mt-1">{listing.views}</Text>
            </View>
            <View className="flex-1 items-center border-l border-gray-200">
              <Text className="text-gray-500 text-sm">Likes</Text>
              <Text className="font-semibold text-gray-900 mt-1">{listing.likes}</Text>
            </View>
            <View className="flex-1 items-center border-l border-gray-200">
              <Text className="text-gray-500 text-sm">Condition</Text>
              <Text className="font-semibold text-gray-900 mt-1">{listing.condition}</Text>
            </View>
          </View>
          
          {/* Details */}
          <View className="py-3">
            <Text className="font-semibold text-gray-900 text-lg mb-3">Details</Text>
            
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-500">Category</Text>
              <Text className="font-medium text-gray-900 capitalize">{listing.category}</Text>
            </View>
            
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-500">Size</Text>
              <Text className="font-medium text-gray-900">{listing.size}</Text>
            </View>
            
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-500">Condition</Text>
              <Text className="font-medium text-gray-900">{listing.condition}</Text>
            </View>
          </View>
          
          {/* Upcycling Techniques */}
          <View className="py-3 border-t border-gray-200">
            <Text className="font-semibold text-gray-900 text-lg mb-3">
              Upcycling Techniques
            </Text>
            <View className="flex-row flex-wrap">
              {listing.upcyclingTechniques.map((technique, index) => (
                <View 
                  key={index}
                  className="bg-emerald-50 rounded-full px-4 py-2 mr-2 mb-2"
                >
                  <Text className="text-emerald-700 font-medium capitalize">
                    {technique}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          
          {/* Description */}
          <View className="py-3 border-t border-gray-200">
            <Text className="font-semibold text-gray-900 text-lg mb-3">Description</Text>
            <Text className="text-gray-700 leading-6">{listing.description}</Text>
          </View>
          
          {/* Before/After */}
          {listing.beforeImage && (
            <View className="py-3 border-t border-gray-200">
              <Text className="font-semibold text-gray-900 text-lg mb-3">
                Transformation
              </Text>
              <View className="flex-row">
                <View className="flex-1 mr-2">
                  <Image
                    source={{ uri: listing.beforeImage }}
                    className="w-full h-40 rounded-lg bg-gray-200"
                    resizeMode="cover"
                  />
                  <Text className="text-center text-gray-500 text-sm mt-2">Before</Text>
                </View>
                <View className="flex-1 ml-2">
                  <Image
                    source={{ uri: listing.images[0] }}
                    className="w-full h-40 rounded-lg bg-gray-200"
                    resizeMode="cover"
                  />
                  <Text className="text-center text-gray-500 text-sm mt-2">After</Text>
                </View>
              </View>
            </View>
          )}
          
          <View className="h-32" />
        </View>
      </ScrollView>
      
      {/* Bottom Action Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex-row items-center">
        {isOwnListing ? (
          <View className="flex-1 bg-gray-100 rounded-full py-4 items-center">
            <Text className="font-semibold text-gray-500">Your Listing</Text>
          </View>
        ) : isSoldOut ? (
          <View className="flex-1 bg-gray-100 rounded-full py-4 items-center">
            <Text className="font-semibold text-gray-500">Sold Out</Text>
          </View>
        ) : isInCart ? (
          <Pressable 
            onPress={handleViewCart}
            className="flex-1 bg-emerald-600 rounded-full py-4 items-center"
          >
            <Text className="font-semibold text-white">View in Cart</Text>
          </Pressable>
        ) : (
          <Pressable 
            onPress={handleAddToCart}
            className="flex-1 bg-black rounded-full py-4 items-center"
          >
            <Text className="font-semibold text-white">Add to Cart</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

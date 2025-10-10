import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Pressable, 
  Image,
  Modal,
  TextInput,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../state/appStore';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  ProductDetail: { listing: any };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CartScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [shippingAddress, setShippingAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  
  const cart = useAppStore(state => state.cart);
  const removeFromCart = useAppStore(state => state.removeFromCart);
  const createOrder = useAppStore(state => state.createOrder);
  const activeAffiliateCode = useAppStore(state => state.activeAffiliateCode);
  const currentUser = useAppStore(state => state.currentUser);
  
  const subtotal = cart.reduce((sum, item) => sum + item.listing.price, 0);
  const total = subtotal;
  
  const handleCheckout = () => {
    if (!currentUser) {
      Alert.alert("Sign In Required", "Please sign in to complete your purchase");
      return;
    }
    setShowCheckoutModal(true);
  };
  
  const handleCompleteCheckout = () => {
    if (!shippingAddress.trim()) {
      Alert.alert("Address Required", "Please enter your shipping address");
      return;
    }
    if (!cardNumber.trim()) {
      Alert.alert("Payment Required", "Please enter your payment information");
      return;
    }
    
    createOrder(cart, activeAffiliateCode || undefined);
    setShowCheckoutModal(false);
    setShippingAddress('');
    setCardNumber('');
    Alert.alert("Order Placed!", "Your order has been placed successfully");
    navigation.navigate('Home');
  };
  
  if (cart.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="px-4 py-3 border-b border-gray-200">
          <Text className="text-2xl font-bold">Cart</Text>
        </View>
        
        <View className="flex-1 items-center justify-center px-8">
          <Ionicons name="cart-outline" size={64} color="#D1D5DB" />
          <Text className="text-gray-900 text-2xl font-bold mt-4">Your cart is empty</Text>
          <Text className="text-gray-500 text-center mt-2">
            Start adding unique upcycled pieces to your cart
          </Text>
          <Pressable 
            onPress={() => navigation.navigate('Home')}
            className="bg-black rounded-full px-8 py-3 mt-6"
          >
            <Text className="text-white font-semibold">Browse Items</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 py-3 border-b border-gray-200">
        <Text className="text-2xl font-bold">Cart ({cart.length})</Text>
      </View>
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {cart.map(item => (
          <View key={item.listing.id} className="flex-row p-4 border-b border-gray-200">
            <Image
              source={{ uri: item.listing.images[0] }}
              className="w-24 h-24 rounded-lg bg-gray-200"
              resizeMode="cover"
            />
            
            <View className="flex-1 ml-4">
              <Text className="font-semibold text-gray-900 mb-1" numberOfLines={2}>
                {item.listing.title}
              </Text>
              <Text className="text-gray-500 text-sm mb-1">
                {item.listing.sellerName}
              </Text>
              <Text className="text-gray-500 text-sm mb-2">
                Size {item.listing.size}
              </Text>
              <Text className="font-bold text-gray-900">
                ${item.listing.price}
              </Text>
            </View>
            
            <Pressable 
              onPress={() => removeFromCart(item.listing.id)}
              className="p-2"
            >
              <Ionicons name="trash-outline" size={24} color="#EF4444" />
            </Pressable>
          </View>
        ))}
        
        <View className="p-4">
          <View className="bg-gray-50 rounded-xl p-4 mb-4">
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-700">Subtotal</Text>
              <Text className="font-semibold text-gray-900">${subtotal.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-700">Shipping</Text>
              <Text className="font-semibold text-emerald-600">FREE</Text>
            </View>
            <View className="border-t border-gray-200 my-2" />
            <View className="flex-row justify-between">
              <Text className="font-bold text-gray-900 text-lg">Total</Text>
              <Text className="font-bold text-gray-900 text-lg">${total.toFixed(2)}</Text>
            </View>
          </View>
          
          {activeAffiliateCode && (
            <View className="bg-emerald-50 rounded-xl p-4 mb-4 flex-row items-center">
              <Ionicons name="pricetag" size={20} color="#10B981" />
              <Text className="text-emerald-700 font-medium ml-2">
                Using affiliate code: {activeAffiliateCode}
              </Text>
            </View>
          )}
          
          <View className="bg-blue-50 rounded-xl p-4 mb-4">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#3B82F6" />
              <View className="flex-1 ml-2">
                <Text className="text-blue-900 font-medium mb-1">Revenue Split</Text>
                <Text className="text-blue-700 text-sm">
                  93% goes to sellers • 7% platform fee
                  {activeAffiliateCode && " (3% to affiliate)"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View className="px-4 py-3 border-t border-gray-200">
        <Pressable 
          onPress={handleCheckout}
          className="bg-black rounded-full py-4 items-center"
        >
          <Text className="text-white font-semibold text-lg">
            Checkout • ${total.toFixed(2)}
          </Text>
        </Pressable>
      </View>
      
      {/* Checkout Modal */}
      <Modal
        visible={showCheckoutModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
            <Pressable onPress={() => setShowCheckoutModal(false)}>
              <Text className="text-gray-900 text-lg">Cancel</Text>
            </Pressable>
            <Text className="text-gray-900 text-lg font-semibold">Checkout</Text>
            <View style={{ width: 60 }} />
          </View>
          
          <ScrollView className="flex-1 px-4 py-6">
            <Text className="text-gray-900 text-xl font-bold mb-6">
              Complete Your Order
            </Text>
            
            {/* Shipping Address */}
            <Text className="text-gray-900 font-semibold mb-2">Shipping Address *</Text>
            <TextInput
              value={shippingAddress}
              onChangeText={setShippingAddress}
              placeholder="Enter your full address"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900 mb-4"
              style={{ minHeight: 80 }}
            />
            
            {/* Payment */}
            <Text className="text-gray-900 font-semibold mb-2">Payment Information *</Text>
            <TextInput
              value={cardNumber}
              onChangeText={setCardNumber}
              placeholder="Card number"
              keyboardType="number-pad"
              className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900 mb-4"
            />
            
            {/* Order Summary */}
            <View className="bg-gray-50 rounded-xl p-4 mb-4">
              <Text className="font-semibold text-gray-900 mb-3">Order Summary</Text>
              {cart.map(item => (
                <View key={item.listing.id} className="flex-row justify-between mb-2">
                  <Text className="text-gray-700 flex-1" numberOfLines={1}>
                    {item.listing.title}
                  </Text>
                  <Text className="font-medium text-gray-900 ml-2">
                    ${item.listing.price}
                  </Text>
                </View>
              ))}
              <View className="border-t border-gray-200 my-2" />
              <View className="flex-row justify-between">
                <Text className="font-bold text-gray-900">Total</Text>
                <Text className="font-bold text-gray-900">${total.toFixed(2)}</Text>
              </View>
            </View>
            
            <Pressable 
              onPress={handleCompleteCheckout}
              className="bg-black rounded-full py-4 items-center"
            >
              <Text className="text-white font-semibold text-lg">
                Place Order • ${total.toFixed(2)}
              </Text>
            </Pressable>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

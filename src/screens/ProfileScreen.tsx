import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Pressable, 
  TextInput,
  Modal,
  Share,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../state/appStore';
import * as Clipboard from 'expo-clipboard';

export default function ProfileScreen() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showAffiliateModal, setShowAffiliateModal] = useState(false);
  
  const currentUser = useAppStore(state => state.currentUser);
  const login = useAppStore(state => state.login);
  const logout = useAppStore(state => state.logout);
  const generateAffiliateLink = useAppStore(state => state.generateAffiliateLink);
  const orders = useAppStore(state => state.orders);
  const listings = useAppStore(state => state.listings);
  const affiliateEarnings = useAppStore(state => state.affiliateEarnings);
  
  const handleLogin = () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert("Error", "Please enter your name and email");
      return;
    }
    
    login(name.trim(), email.trim());
    setShowLoginModal(false);
    setName('');
    setEmail('');
  };
  
  const handleLogout = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Sign Out", onPress: logout, style: "destructive" }
      ]
    );
  };
  
  const handleShareAffiliateLink = async () => {
    if (!currentUser) return;
    
    const link = generateAffiliateLink(currentUser.id);
    
    try {
      await Share.share({
        message: `Join me on Dezyne and shop unique upcycled clothing! Use my link: ${link}`,
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleCopyAffiliateLink = async () => {
    if (!currentUser) return;
    
    const link = generateAffiliateLink(currentUser.id);
    await Clipboard.setStringAsync(link);
    Alert.alert("Copied!", "Your affiliate link has been copied to clipboard");
  };
  
  if (!currentUser) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="px-4 py-3 border-b border-gray-200">
          <Text className="text-2xl font-bold">Profile</Text>
        </View>
        
        <View className="flex-1 items-center justify-center px-8">
          <View className="w-20 h-20 bg-gray-200 rounded-full items-center justify-center mb-4">
            <Ionicons name="person" size={40} color="#9CA3AF" />
          </View>
          <Text className="text-gray-900 text-2xl font-bold mb-2">Welcome to Dezyne</Text>
          <Text className="text-gray-500 text-center mb-6">
            Sign in to track your orders, manage listings, and earn through our affiliate program
          </Text>
          <Pressable 
            onPress={() => setShowLoginModal(true)}
            className="bg-black rounded-full px-8 py-3"
          >
            <Text className="text-white font-semibold">Sign In</Text>
          </Pressable>
        </View>
        
        {/* Login Modal */}
        <Modal
          visible={showLoginModal}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <SafeAreaView className="flex-1 bg-white">
            <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
              <Pressable onPress={() => setShowLoginModal(false)}>
                <Text className="text-gray-900 text-lg">Cancel</Text>
              </Pressable>
              <Text className="text-gray-900 text-lg font-semibold">Sign In</Text>
              <View style={{ width: 60 }} />
            </View>
            
            <ScrollView className="flex-1 px-4 py-6">
              <Text className="text-gray-900 text-2xl font-bold mb-2">
                Join Dezyne
              </Text>
              <Text className="text-gray-500 mb-6">
                Create your account to start buying and selling upcycled clothing
              </Text>
              
              <Text className="text-gray-900 font-semibold mb-2">Name *</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Your name"
                className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900 mb-4"
              />
              
              <Text className="text-gray-900 font-semibold mb-2">Email *</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="your@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900 mb-6"
              />
              
              <Pressable 
                onPress={handleLogin}
                className="bg-black rounded-full py-4 items-center"
              >
                <Text className="text-white font-semibold text-lg">Continue</Text>
              </Pressable>
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    );
  }
  
  // Calculate user stats
  const myListings = listings.filter(l => l.sellerId === currentUser.id);
  const soldListings = myListings.filter(l => l.isSold);
  const myPurchases = orders.filter(o => o.buyerId === currentUser.id);
  const mySales = orders.filter(o => o.sellerId === currentUser.id);
  const myAffiliateEarnings = affiliateEarnings.filter(e => e.affiliateUserId === currentUser.id);
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 py-3 border-b border-gray-200">
        <Text className="text-2xl font-bold">Profile</Text>
      </View>
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* User Info */}
        <View className="p-4 border-b border-gray-200">
          <View className="flex-row items-center">
            <View className="w-16 h-16 bg-gray-900 rounded-full items-center justify-center">
              <Text className="text-white text-2xl font-bold">
                {currentUser.name[0]}
              </Text>
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-gray-900 text-xl font-bold">{currentUser.name}</Text>
              <Text className="text-gray-500">{currentUser.email}</Text>
              {currentUser.isVerifiedUpcycler && (
                <View className="flex-row items-center mt-1">
                  <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                  <Text className="text-emerald-600 font-medium ml-1">Verified Upcycler</Text>
                </View>
              )}
            </View>
          </View>
        </View>
        
        {/* Earnings */}
        <View className="p-4 bg-gray-50">
          <Text className="text-gray-900 font-semibold text-lg mb-4">Earnings</Text>
          
          <View className="flex-row mb-4">
            <View className="flex-1 bg-white rounded-xl p-4 mr-2 shadow-sm">
              <Text className="text-gray-500 text-sm mb-1">Total Earnings</Text>
              <Text className="text-gray-900 text-2xl font-bold">
                ${currentUser.totalEarnings.toFixed(2)}
              </Text>
            </View>
            
            <View className="flex-1 bg-white rounded-xl p-4 ml-2 shadow-sm">
              <Text className="text-gray-500 text-sm mb-1">Sales</Text>
              <Text className="text-gray-900 text-2xl font-bold">
                ${currentUser.sellerEarnings.toFixed(2)}
              </Text>
            </View>
          </View>
          
          <Pressable 
            onPress={() => setShowAffiliateModal(true)}
            className="bg-emerald-600 rounded-xl p-4 flex-row items-center justify-between"
          >
            <View className="flex-1">
              <Text className="text-white font-semibold text-lg mb-1">Affiliate Earnings</Text>
              <Text className="text-emerald-100 text-2xl font-bold">
                ${currentUser.affiliateEarnings.toFixed(2)}
              </Text>
              <Text className="text-emerald-100 text-sm mt-1">
                {myAffiliateEarnings.length} referral {myAffiliateEarnings.length === 1 ? 'sale' : 'sales'}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#FFF" />
          </Pressable>
        </View>
        
        {/* Stats */}
        <View className="p-4 border-b border-gray-200">
          <Text className="text-gray-900 font-semibold text-lg mb-4">Activity</Text>
          
          <View className="flex-row justify-between mb-4">
            <View className="flex-1 items-center">
              <Text className="text-gray-500 text-sm mb-1">Listings</Text>
              <Text className="text-gray-900 text-xl font-bold">{myListings.length}</Text>
            </View>
            
            <View className="flex-1 items-center border-l border-gray-200">
              <Text className="text-gray-500 text-sm mb-1">Sold</Text>
              <Text className="text-gray-900 text-xl font-bold">{soldListings.length}</Text>
            </View>
            
            <View className="flex-1 items-center border-l border-gray-200">
              <Text className="text-gray-500 text-sm mb-1">Purchases</Text>
              <Text className="text-gray-900 text-xl font-bold">{myPurchases.length}</Text>
            </View>
          </View>
        </View>
        
        {/* Orders */}
        {(myPurchases.length > 0 || mySales.length > 0) && (
          <View className="p-4 border-b border-gray-200">
            <Text className="text-gray-900 font-semibold text-lg mb-4">Recent Orders</Text>
            
            {[...myPurchases, ...mySales]
              .sort((a, b) => b.createdAt - a.createdAt)
              .slice(0, 5)
              .map(order => {
                const isBuyer = order.buyerId === currentUser.id;
                return (
                  <View key={order.id} className="bg-gray-50 rounded-xl p-4 mb-3">
                    <View className="flex-row items-start">
                      <View className="flex-1">
                        <View className="flex-row items-center mb-1">
                          <Ionicons 
                            name={isBuyer ? "cart" : "storefront"} 
                            size={16} 
                            color={isBuyer ? "#3B82F6" : "#10B981"}
                          />
                          <Text className={`font-medium ml-1 ${isBuyer ? 'text-blue-600' : 'text-emerald-600'}`}>
                            {isBuyer ? 'Purchased' : 'Sold'}
                          </Text>
                        </View>
                        <Text className="text-gray-900 font-semibold mb-1">
                          {order.listing.title}
                        </Text>
                        <Text className="text-gray-500 text-sm">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </Text>
                      </View>
                      <View className="items-end">
                        <Text className="text-gray-900 font-bold mb-1">
                          ${isBuyer ? order.totalPrice.toFixed(2) : order.sellerAmount.toFixed(2)}
                        </Text>
                        <View className={`rounded-full px-3 py-1 ${
                          order.status === 'delivered' ? 'bg-emerald-100' : 'bg-blue-100'
                        }`}>
                          <Text className={`text-xs font-medium capitalize ${
                            order.status === 'delivered' ? 'text-emerald-700' : 'text-blue-700'
                          }`}>
                            {order.status}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
          </View>
        )}
        
        {/* Sign Out */}
        <View className="p-4 pb-8">
          <Pressable 
            onPress={handleLogout}
            className="bg-gray-100 rounded-full py-4 items-center"
          >
            <Text className="text-gray-900 font-semibold">Sign Out</Text>
          </Pressable>
        </View>
      </ScrollView>
      
      {/* Affiliate Modal */}
      <Modal
        visible={showAffiliateModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
            <Pressable onPress={() => setShowAffiliateModal(false)}>
              <Ionicons name="close" size={28} color="#000" />
            </Pressable>
            <Text className="text-gray-900 text-lg font-semibold">Affiliate Program</Text>
            <View style={{ width: 28 }} />
          </View>
          
          <ScrollView className="flex-1 px-4 py-6">
            <View className="items-center py-6">
              <View className="w-20 h-20 bg-emerald-100 rounded-full items-center justify-center mb-4">
                <Ionicons name="link" size={40} color="#10B981" />
              </View>
              <Text className="text-gray-900 text-2xl font-bold mb-2 text-center">
                Share & Earn 3%
              </Text>
              <Text className="text-gray-500 text-center px-4">
                Earn 3% commission on every purchase made through your affiliate link
              </Text>
            </View>
            
            {/* Earnings Summary */}
            <View className="bg-emerald-50 rounded-2xl p-6 mb-6">
              <Text className="text-emerald-900 font-semibold text-lg mb-4">Your Earnings</Text>
              <Text className="text-emerald-600 text-4xl font-bold mb-2">
                ${currentUser.affiliateEarnings.toFixed(2)}
              </Text>
              <Text className="text-emerald-700">
                From {myAffiliateEarnings.length} referral {myAffiliateEarnings.length === 1 ? 'sale' : 'sales'}
              </Text>
            </View>
            
            {/* Affiliate Code */}
            <View className="bg-gray-50 rounded-2xl p-6 mb-6">
              <Text className="text-gray-900 font-semibold mb-3">Your Affiliate Code</Text>
              <View className="bg-white rounded-xl p-4 border-2 border-gray-200">
                <Text className="text-center text-gray-900 text-2xl font-bold tracking-wider">
                  {currentUser.affiliateCode}
                </Text>
              </View>
            </View>
            
            {/* Share Link */}
            <View className="bg-gray-50 rounded-2xl p-6 mb-6">
              <Text className="text-gray-900 font-semibold mb-3">Your Affiliate Link</Text>
              <View className="bg-white rounded-xl p-4 border-2 border-gray-200 mb-3">
                <Text className="text-center text-gray-700 text-sm" numberOfLines={1}>
                  {generateAffiliateLink(currentUser.id)}
                </Text>
              </View>
              
              <View className="flex-row">
                <Pressable 
                  onPress={handleCopyAffiliateLink}
                  className="flex-1 bg-gray-900 rounded-full py-3 items-center mr-2"
                >
                  <View className="flex-row items-center">
                    <Ionicons name="copy-outline" size={20} color="#FFF" />
                    <Text className="text-white font-semibold ml-2">Copy</Text>
                  </View>
                </Pressable>
                
                <Pressable 
                  onPress={handleShareAffiliateLink}
                  className="flex-1 bg-emerald-600 rounded-full py-3 items-center ml-2"
                >
                  <View className="flex-row items-center">
                    <Ionicons name="share-outline" size={20} color="#FFF" />
                    <Text className="text-white font-semibold ml-2">Share</Text>
                  </View>
                </Pressable>
              </View>
            </View>
            
            {/* How It Works */}
            <View className="bg-gray-50 rounded-2xl p-6">
              <Text className="text-gray-900 font-semibold text-lg mb-4">How It Works</Text>
              
              <View className="flex-row items-start mb-4">
                <View className="w-8 h-8 bg-emerald-600 rounded-full items-center justify-center mr-3">
                  <Text className="text-white font-bold">1</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-gray-900 font-medium mb-1">Share Your Link</Text>
                  <Text className="text-gray-600 text-sm">
                    Share your unique affiliate link with friends and on social media
                  </Text>
                </View>
              </View>
              
              <View className="flex-row items-start mb-4">
                <View className="w-8 h-8 bg-emerald-600 rounded-full items-center justify-center mr-3">
                  <Text className="text-white font-bold">2</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-gray-900 font-medium mb-1">They Shop</Text>
                  <Text className="text-gray-600 text-sm">
                    When someone uses your link and makes a purchase, you earn
                  </Text>
                </View>
              </View>
              
              <View className="flex-row items-start">
                <View className="w-8 h-8 bg-emerald-600 rounded-full items-center justify-center mr-3">
                  <Text className="text-white font-bold">3</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-gray-900 font-medium mb-1">Earn 3%</Text>
                  <Text className="text-gray-600 text-sm">
                    You receive 3% of each sale made through your link
                  </Text>
                </View>
              </View>
            </View>
            
            {/* Recent Referrals */}
            {myAffiliateEarnings.length > 0 && (
              <View className="mt-6">
                <Text className="text-gray-900 font-semibold text-lg mb-4">Recent Referrals</Text>
                {myAffiliateEarnings.slice(0, 5).map(earning => (
                  <View key={earning.id} className="bg-gray-50 rounded-xl p-4 mb-3 flex-row justify-between items-center">
                    <View className="flex-1">
                      <Text className="text-gray-900 font-medium mb-1">Referral Sale</Text>
                      <Text className="text-gray-500 text-sm">
                        {new Date(earning.createdAt).toLocaleDateString()}
                      </Text>
                    </View>
                    <Text className="text-emerald-600 font-bold text-lg">
                      +${earning.amount.toFixed(2)}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

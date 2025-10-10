import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Pressable, 
  TextInput,
  Image,
  Modal,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../state/appStore';
import { ClothingCategory, ClothingSize, ClothingCondition, UPCYCLING_TECHNIQUES } from '../types/models';
import * as ImagePicker from 'expo-image-picker';

const CATEGORIES: { value: ClothingCategory; label: string }[] = [
  { value: 'tops', label: 'Tops' },
  { value: 'bottoms', label: 'Bottoms' },
  { value: 'dresses', label: 'Dresses' },
  { value: 'outerwear', label: 'Outerwear' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'shoes', label: 'Shoes' },
  { value: 'other', label: 'Other' },
];

const SIZES: ClothingSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];
const CONDITIONS: ClothingCondition[] = ['Like New', 'Good', 'Fair'];

export default function SellScreen() {
  const currentUser = useAppStore(state => state.currentUser);
  const becomeVerifiedSeller = useAppStore(state => state.becomeVerifiedSeller);
  const addListing = useAppStore(state => state.addListing);
  
  // Verification state
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationTechniques, setVerificationTechniques] = useState<string[]>([]);
  const [verificationImages, setVerificationImages] = useState<string[]>([]);
  
  // Listing form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<ClothingCategory>('tops');
  const [size, setSize] = useState<ClothingSize>('M');
  const [condition, setCondition] = useState<ClothingCondition>('Good');
  const [images, setImages] = useState<string[]>([]);
  const [beforeImage, setBeforeImage] = useState<string>('');
  const [selectedTechniques, setSelectedTechniques] = useState<string[]>([]);
  
  const isVerifiedSeller = currentUser?.isVerifiedUpcycler || false;
  
  const pickImage = async (type: 'main' | 'before' | 'verification') => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: type === 'main' || type === 'verification',
      quality: 0.8,
    });
    
    if (!result.canceled) {
      if (type === 'main') {
        const newImages = result.assets.map(asset => asset.uri);
        setImages(prev => [...prev, ...newImages].slice(0, 5));
      } else if (type === 'before') {
        setBeforeImage(result.assets[0].uri);
      } else if (type === 'verification') {
        const newImages = result.assets.map(asset => asset.uri);
        setVerificationImages(prev => [...prev, ...newImages].slice(0, 3));
      }
    }
  };
  
  const toggleTechnique = (techniqueId: string) => {
    setSelectedTechniques(prev => 
      prev.includes(techniqueId)
        ? prev.filter(t => t !== techniqueId)
        : [...prev, techniqueId]
    );
  };
  
  const toggleVerificationTechnique = (techniqueId: string) => {
    setVerificationTechniques(prev => 
      prev.includes(techniqueId)
        ? prev.filter(t => t !== techniqueId)
        : [...prev, techniqueId]
    );
  };
  
  const handleVerification = () => {
    if (verificationTechniques.length === 0) {
      Alert.alert("Selection Required", "Please select at least one upcycling technique you use");
      return;
    }
    if (verificationImages.length === 0) {
      Alert.alert("Images Required", "Please upload at least one photo of your upcycled work");
      return;
    }
    
    becomeVerifiedSeller({
      techniques: verificationTechniques,
      images: verificationImages,
    });
    
    setShowVerificationModal(false);
    setVerificationTechniques([]);
    setVerificationImages([]);
  };
  
  const handleSubmitListing = () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a title");
      return;
    }
    if (!description.trim()) {
      Alert.alert("Error", "Please enter a description");
      return;
    }
    if (!price || parseFloat(price) <= 0) {
      Alert.alert("Error", "Please enter a valid price");
      return;
    }
    if (images.length === 0) {
      Alert.alert("Error", "Please add at least one image");
      return;
    }
    if (selectedTechniques.length === 0) {
      Alert.alert("Error", "Please select at least one upcycling technique");
      return;
    }
    
    addListing({
      title: title.trim(),
      description: description.trim(),
      price: parseFloat(price),
      category,
      size,
      condition,
      images,
      beforeImage: beforeImage || undefined,
      upcyclingTechniques: selectedTechniques,
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setPrice('');
    setCategory('tops');
    setSize('M');
    setCondition('Good');
    setImages([]);
    setBeforeImage('');
    setSelectedTechniques([]);
    
    Alert.alert("Success", "Your listing has been created!");
  };
  
  // Not logged in
  if (!currentUser) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center px-8">
          <Ionicons name="person-outline" size={64} color="#D1D5DB" />
          <Text className="text-gray-900 text-2xl font-bold mt-4 text-center">
            Sign in to Sell
          </Text>
          <Text className="text-gray-500 text-center mt-2">
            Create an account to start selling your upcycled creations
          </Text>
        </View>
      </SafeAreaView>
    );
  }
  
  // Not verified seller
  if (!isVerifiedSeller) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="flex-1 px-4 py-6">
          <View className="items-center py-8">
            <View className="w-20 h-20 bg-emerald-100 rounded-full items-center justify-center mb-4">
              <Ionicons name="leaf" size={40} color="#10B981" />
            </View>
            <Text className="text-gray-900 text-2xl font-bold text-center mb-2">
              Become a Verified Upcycler
            </Text>
            <Text className="text-gray-500 text-center px-4">
              To sell on Dezyne, you need to verify that you upcycle clothing. Show us your creative work!
            </Text>
          </View>
          
          <View className="bg-gray-50 rounded-2xl p-6 mb-6">
            <Text className="text-gray-900 font-semibold text-lg mb-4">
              What counts as upcycling?
            </Text>
            
            {UPCYCLING_TECHNIQUES.map((technique) => (
              <View key={technique.id} className="flex-row items-start mb-3">
                <View className="w-6 h-6 bg-emerald-100 rounded-full items-center justify-center mr-3 mt-0.5">
                  <Ionicons name="checkmark" size={16} color="#10B981" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-900 font-medium">{technique.name}</Text>
                  <Text className="text-gray-500 text-sm">{technique.description}</Text>
                </View>
              </View>
            ))}
          </View>
          
          <Pressable 
            onPress={() => setShowVerificationModal(true)}
            className="bg-black rounded-full py-4 items-center"
          >
            <Text className="text-white font-semibold text-lg">Get Verified</Text>
          </Pressable>
        </ScrollView>
        
        {/* Verification Modal */}
        <Modal
          visible={showVerificationModal}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <SafeAreaView className="flex-1 bg-white">
            <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
              <Pressable onPress={() => setShowVerificationModal(false)}>
                <Text className="text-gray-900 text-lg">Cancel</Text>
              </Pressable>
              <Text className="text-gray-900 text-lg font-semibold">Verification</Text>
              <Pressable onPress={handleVerification}>
                <Text className="text-emerald-600 text-lg font-semibold">Submit</Text>
              </Pressable>
            </View>
            
            <ScrollView className="flex-1 px-4 py-6">
              <Text className="text-gray-900 text-xl font-bold mb-2">
                Show us your work
              </Text>
              <Text className="text-gray-500 mb-6">
                Select the upcycling techniques you use and upload photos of your creations
              </Text>
              
              {/* Techniques */}
              <Text className="text-gray-900 font-semibold mb-3">
                Your Upcycling Techniques
              </Text>
              <View className="flex-row flex-wrap mb-6">
                {UPCYCLING_TECHNIQUES.map(technique => {
                  const isSelected = verificationTechniques.includes(technique.id);
                  return (
                    <Pressable
                      key={technique.id}
                      onPress={() => toggleVerificationTechnique(technique.id)}
                      className={`rounded-full px-4 py-2 mr-2 mb-2 ${
                        isSelected ? 'bg-emerald-600' : 'bg-gray-100'
                      }`}
                    >
                      <Text className={isSelected ? 'text-white font-medium' : 'text-gray-700'}>
                        {technique.name}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
              
              {/* Images */}
              <Text className="text-gray-900 font-semibold mb-3">
                Photos of Your Work
              </Text>
              <View className="flex-row flex-wrap mb-4">
                {verificationImages.map((uri, index) => (
                  <View key={index} className="w-24 h-24 rounded-lg mr-2 mb-2 relative">
                    <Image source={{ uri }} className="w-full h-full rounded-lg" />
                    <Pressable
                      onPress={() => setVerificationImages(prev => prev.filter((_, i) => i !== index))}
                      className="absolute -top-2 -right-2 bg-black rounded-full p-1"
                    >
                      <Ionicons name="close" size={16} color="#FFF" />
                    </Pressable>
                  </View>
                ))}
                
                {verificationImages.length < 3 && (
                  <Pressable
                    onPress={() => pickImage('verification')}
                    className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 items-center justify-center"
                  >
                    <Ionicons name="camera" size={32} color="#9CA3AF" />
                  </Pressable>
                )}
              </View>
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    );
  }
  
  // Verified seller - show listing form
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 py-3 border-b border-gray-200">
        <Text className="text-2xl font-bold">Create Listing</Text>
      </View>
      
      <ScrollView className="flex-1 px-4 py-6" showsVerticalScrollIndicator={false}>
        {/* Images */}
        <Text className="text-gray-900 font-semibold mb-3">Photos *</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
          {images.map((uri, index) => (
            <View key={index} className="w-32 h-40 rounded-xl mr-3 relative">
              <Image source={{ uri }} className="w-full h-full rounded-xl" resizeMode="cover" />
              <Pressable
                onPress={() => setImages(prev => prev.filter((_, i) => i !== index))}
                className="absolute -top-2 -right-2 bg-black rounded-full p-1"
              >
                <Ionicons name="close" size={16} color="#FFF" />
              </Pressable>
            </View>
          ))}
          
          {images.length < 5 && (
            <Pressable
              onPress={() => pickImage('main')}
              className="w-32 h-40 rounded-xl border-2 border-dashed border-gray-300 items-center justify-center"
            >
              <Ionicons name="camera" size={32} color="#9CA3AF" />
              <Text className="text-gray-500 text-xs mt-2">Add Photo</Text>
            </Pressable>
          )}
        </ScrollView>
        
        {/* Before Image */}
        <Text className="text-gray-900 font-semibold mb-3">Before Photo (Optional)</Text>
        {beforeImage ? (
          <View className="w-32 h-40 rounded-xl mb-6 relative">
            <Image source={{ uri: beforeImage }} className="w-full h-full rounded-xl" resizeMode="cover" />
            <Pressable
              onPress={() => setBeforeImage('')}
              className="absolute -top-2 -right-2 bg-black rounded-full p-1"
            >
              <Ionicons name="close" size={16} color="#FFF" />
            </Pressable>
          </View>
        ) : (
          <Pressable
            onPress={() => pickImage('before')}
            className="w-32 h-40 rounded-xl border-2 border-dashed border-gray-300 items-center justify-center mb-6"
          >
            <Ionicons name="camera" size={32} color="#9CA3AF" />
            <Text className="text-gray-500 text-xs mt-2">Before Photo</Text>
          </Pressable>
        )}
        
        {/* Title */}
        <Text className="text-gray-900 font-semibold mb-2">Title *</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="e.g., Hand-Painted Denim Jacket"
          className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900 mb-4"
        />
        
        {/* Description */}
        <Text className="text-gray-900 font-semibold mb-2">Description *</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Describe your upcycled piece..."
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900 mb-4"
          style={{ minHeight: 100 }}
        />
        
        {/* Price */}
        <Text className="text-gray-900 font-semibold mb-2">Price *</Text>
        <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3 mb-4">
          <Text className="text-gray-900 text-lg mr-2">$</Text>
          <TextInput
            value={price}
            onChangeText={setPrice}
            placeholder="0.00"
            keyboardType="decimal-pad"
            className="flex-1 text-gray-900"
          />
        </View>
        
        <View className="bg-emerald-50 rounded-xl p-4 mb-4">
          <Text className="text-emerald-900 font-medium mb-1">Your Earnings</Text>
          <Text className="text-emerald-700 text-sm">
            You will receive 93% of the sale price (${(parseFloat(price || '0') * 0.93).toFixed(2)})
          </Text>
        </View>
        
        {/* Category */}
        <Text className="text-gray-900 font-semibold mb-3">Category *</Text>
        <View className="flex-row flex-wrap mb-4">
          {CATEGORIES.map(cat => {
            const isSelected = category === cat.value;
            return (
              <Pressable
                key={cat.value}
                onPress={() => setCategory(cat.value)}
                className={`rounded-full px-4 py-2 mr-2 mb-2 ${
                  isSelected ? 'bg-black' : 'bg-gray-100'
                }`}
              >
                <Text className={isSelected ? 'text-white font-medium' : 'text-gray-700'}>
                  {cat.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
        
        {/* Size */}
        <Text className="text-gray-900 font-semibold mb-3">Size *</Text>
        <View className="flex-row flex-wrap mb-4">
          {SIZES.map(s => {
            const isSelected = size === s;
            return (
              <Pressable
                key={s}
                onPress={() => setSize(s)}
                className={`rounded-full px-4 py-2 mr-2 mb-2 ${
                  isSelected ? 'bg-black' : 'bg-gray-100'
                }`}
              >
                <Text className={isSelected ? 'text-white font-medium' : 'text-gray-700'}>
                  {s}
                </Text>
              </Pressable>
            );
          })}
        </View>
        
        {/* Condition */}
        <Text className="text-gray-900 font-semibold mb-3">Condition *</Text>
        <View className="flex-row flex-wrap mb-4">
          {CONDITIONS.map(c => {
            const isSelected = condition === c;
            return (
              <Pressable
                key={c}
                onPress={() => setCondition(c)}
                className={`rounded-full px-4 py-2 mr-2 mb-2 ${
                  isSelected ? 'bg-black' : 'bg-gray-100'
                }`}
              >
                <Text className={isSelected ? 'text-white font-medium' : 'text-gray-700'}>
                  {c}
                </Text>
              </Pressable>
            );
          })}
        </View>
        
        {/* Upcycling Techniques */}
        <Text className="text-gray-900 font-semibold mb-3">Upcycling Techniques *</Text>
        <View className="flex-row flex-wrap mb-6">
          {UPCYCLING_TECHNIQUES.map(technique => {
            const isSelected = selectedTechniques.includes(technique.id);
            return (
              <Pressable
                key={technique.id}
                onPress={() => toggleTechnique(technique.id)}
                className={`rounded-full px-4 py-2 mr-2 mb-2 ${
                  isSelected ? 'bg-emerald-600' : 'bg-gray-100'
                }`}
              >
                <Text className={isSelected ? 'text-white font-medium' : 'text-gray-700'}>
                  {technique.name}
                </Text>
              </Pressable>
            );
          })}
        </View>
        
        {/* Submit Button */}
        <Pressable 
          onPress={handleSubmitListing}
          className="bg-black rounded-full py-4 items-center mb-8"
        >
          <Text className="text-white font-semibold text-lg">List Item</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

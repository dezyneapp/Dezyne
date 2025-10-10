import { useEffect } from 'react';
import { Linking } from 'react-native';
import { useAppStore } from '../state/appStore';

export function useDeepLinking() {
  const trackAffiliateClick = useAppStore(state => state.trackAffiliateClick);
  
  useEffect(() => {
    // Handle initial URL when app is opened from closed state
    const handleInitialURL = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        handleDeepLink(url);
      }
    };
    
    // Handle URL when app is already open
    const subscription = Linking.addEventListener('url', (event) => {
      handleDeepLink(event.url);
    });
    
    handleInitialURL();
    
    return () => {
      subscription.remove();
    };
  }, []);
  
  const handleDeepLink = (url: string) => {
    // Parse URL: dezyne://app?ref=AFFILIATE_CODE
    try {
      const urlObj = new URL(url);
      const affiliateCode = urlObj.searchParams.get('ref');
      
      if (affiliateCode) {
        trackAffiliateClick(affiliateCode);
      }
    } catch (error) {
      console.error('Error parsing deep link:', error);
    }
  };
}

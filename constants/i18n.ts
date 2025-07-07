import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import en from './locales/en.json';
import es from './locales/es.json';

const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};

// Function to get stored language
const getStoredLanguage = async () => {
  try {
    const persistedState = await AsyncStorage.getItem('persist:root');
    if (persistedState) {
      const parsedState = JSON.parse(persistedState);
      const configUI = JSON.parse(parsedState.configUI || '{}');
      return configUI.language || 'es';
    }
  } catch (error) {
    console.log('Error reading stored language:', error);
  }
  return 'es'; // Default to Spanish
};

// Initialize i18n with stored language
const initializeI18n = async () => {
  const storedLanguage = await getStoredLanguage();
  
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: storedLanguage, // Use stored language
      fallbackLng: 'es',
      interpolation: {
        escapeValue: false, // React already escapes values
      },
      compatibilityJSON: 'v4', // For React Native compatibility
    });
};

// Initialize immediately
initializeI18n();

export default i18n; 
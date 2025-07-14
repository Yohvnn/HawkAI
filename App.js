import React, { useState, useCallback, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  Alert, 
  TouchableOpacity,
  useColorScheme
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomChat from './components/CustomChat';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { CONFIG, validateApiKey, optimizePrompt, getThemeColors } from './config';
import { getTranslation, DEFAULT_LANGUAGE } from './languages';
import SettingsModal from './components/SettingsModal';
import ApiKeyModal from './components/ApiKeyModal';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [genAI, setGenAI] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(CONFIG.UI.DEFAULT_THEME);
  const [currentAccent, setCurrentAccent] = useState(CONFIG.UI.DEFAULT_ACCENT);
  const [currentLanguage, setCurrentLanguage] = useState(CONFIG.UI.DEFAULT_LANGUAGE);
  const [userApiKey, setUserApiKey] = useState('');
  const [assistantName, setAssistantName] = useState('Assistant');
  
  // Get system color scheme
  const systemColorScheme = useColorScheme();
  
  // Determine actual theme to use (if SYSTEM is selected, use system preference)
  const actualTheme = currentTheme === 'SYSTEM' 
    ? (systemColorScheme === 'dark' ? 'DARK' : 'LIGHT')
    : currentTheme;
  
  // Get current theme colors
  const colors = getThemeColors(actualTheme, currentAccent);
  
  // Translation function
  const t = useCallback((key) => getTranslation(key, currentLanguage), [currentLanguage]);

  useEffect(() => {
    // Load saved preferences
    loadPreferences();
  }, []);

  useEffect(() => {
    initializeAI();
    
    // Set dynamic welcome message based on API key status
    const welcomeText = userApiKey || CONFIG.GEMINI.API_KEY !== 'YOUR_GEMINI_API_KEY_HERE' 
      ? t('WELCOME_MESSAGE')
      : t('WELCOME_NO_API');

    setMessages([
      {
        _id: 1,
        text: welcomeText,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: assistantName,
          avatar: '🤖',
        },
      },
    ]);
  }, [userApiKey, assistantName, currentLanguage, t]);

  const loadPreferences = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('userTheme');
      const savedAccent = await AsyncStorage.getItem('userAccent');
      const savedLanguage = await AsyncStorage.getItem('userLanguage');
      const savedApiKey = await AsyncStorage.getItem('userApiKey');
      const savedAssistantName = await AsyncStorage.getItem('assistantName');
      
      if (savedTheme) setCurrentTheme(savedTheme);
      if (savedAccent) setCurrentAccent(savedAccent);
      if (savedLanguage) setCurrentLanguage(savedLanguage);
      if (savedApiKey) setUserApiKey(savedApiKey);
      if (savedAssistantName) setAssistantName(savedAssistantName);
    } catch (error) {
      console.log('No saved preferences found');
    }
  };

  const savePreferences = async (theme, accent, language) => {
    try {
      await AsyncStorage.setItem('userTheme', theme);
      await AsyncStorage.setItem('userAccent', accent);
      if (language) await AsyncStorage.setItem('userLanguage', language);
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  };

  const handleThemeChange = (newTheme) => {
    setCurrentTheme(newTheme);
    savePreferences(newTheme, currentAccent, currentLanguage);
  };

  const handleAccentChange = (newAccent) => {
    setCurrentAccent(newAccent);
    savePreferences(currentTheme, newAccent, currentLanguage);
  };

  const handleLanguageChange = (newLanguage) => {
    setCurrentLanguage(newLanguage);
    savePreferences(currentTheme, currentAccent, newLanguage);
  };

  const handleAssistantNameChange = async (newName) => {
    try {
      await AsyncStorage.setItem('assistantName', newName);
      setAssistantName(newName);
    } catch (error) {
      console.error('Failed to save assistant name:', error);
      Alert.alert('Error', 'Failed to save assistant name. Please try again.');
    }
  };

  const initializeAI = () => {
    // Use user's API key if available, otherwise fall back to default
    const apiKeyToUse = userApiKey || CONFIG.GEMINI.API_KEY;
    const apiValidation = validateApiKey(apiKeyToUse);
    
    if (apiValidation.isValid) {
      try {
        const ai = new GoogleGenerativeAI(apiKeyToUse);
        setGenAI(ai);
      } catch (error) {
        console.error('Failed to initialize Gemini AI:', error);
        Alert.alert('AI Initialization Error', 'Failed to connect to Gemini AI. Please check your API key.');
      }
    } else {
      console.warn(apiValidation.message);
      setGenAI(null);
    }
  };

  const handleSaveApiKey = async (newApiKey) => {
    try {
      await AsyncStorage.setItem('userApiKey', newApiKey);
      setUserApiKey(newApiKey);
      Alert.alert('Success!', 'Your API key has been saved successfully. You can now start chatting!');
    } catch (error) {
      console.error('Failed to save API key:', error);
      Alert.alert('Error', 'Failed to save API key. Please try again.');
    }
  };

  const onSend = useCallback(async (newMessages = []) => {
    // Check if AI is initialized
    if (!genAI) {
      Alert.alert(
        'No API Key', 
        'Please set up your Gemini API key first to start chatting!',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Setup API Key', onPress: () => setShowApiKeyModal(true) }
        ]
      );
      return;
    }

    // Add user message immediately
    setMessages(previousMessages => [...previousMessages, ...newMessages]);
    setIsTyping(true);

    try {
      const userMessage = newMessages[0].text;
      const response = await getGeminiResponse(userMessage);
      
      // Add assistant response
      const assistantMessage = {
        _id: Math.round(Math.random() * 1000000),
        text: response,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: assistantName,
          avatar: '🤖',
        },
      };

      setMessages(previousMessages => [...previousMessages, assistantMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      let errorMessage = 'Sorry, I encountered an error. Please try again.';
      if (error.message.includes('API key')) {
        errorMessage = 'Please configure your Gemini API key in config.js file.';
      }
      
      const errorResponse = {
        _id: Math.round(Math.random() * 1000000),
        text: errorMessage,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: assistantName,
          avatar: '⚠️',
        },
      };

      setMessages(previousMessages => [...previousMessages, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  }, [genAI]);

  const getGeminiResponse = async (message) => {
    if (!genAI) {
      throw new Error('Gemini AI not initialized. Please check your API key.');
    }

    const model = genAI.getGenerativeModel({ 
      model: CONFIG.GEMINI.MODEL_NAME,
      generationConfig: {
        maxOutputTokens: CONFIG.GEMINI.MAX_TOKENS,
        temperature: CONFIG.GEMINI.TEMPERATURE,
      },
    });

    // Use optimized prompt for cost efficiency
    const optimizedPrompt = optimizePrompt(message);

    const result = await model.generateContent(optimizedPrompt);
    const response = await result.response;
    return response.text();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.BACKGROUND }]}>
      <StatusBar style={colors.STATUS_BAR} />
      
      {/* Header with shadcn/ui styling */}
      <View style={[styles.header, { 
        backgroundColor: colors.BACKGROUND,
        borderBottomColor: colors.BORDER,
      }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerText}>
            <Text style={[styles.headerTitle, { color: colors.TEXT_PRIMARY }]}>{CONFIG.APP.NAME}</Text>
            <Text style={[styles.headerSubtitle, { color: colors.TEXT_MUTED }]}>
              {!genAI ? 'Setup API Key Required' : isTyping ? `${assistantName} is typing...` : `Online • ${assistantName}`}
            </Text>
          </View>
          <TouchableOpacity 
            style={[styles.settingsButton, { 
              backgroundColor: colors.CARD,
              borderColor: colors.BORDER,
            }]} 
            onPress={() => setShowSettings(true)}
          >
            <Ionicons name="settings-outline" size={20} color={colors.TEXT_SECONDARY} />
          </TouchableOpacity>
        </View>
      </View>

        {/* Chat Interface */}
      <CustomChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 1,
        }}
        isLoading={isTyping}
        theme={colors}
        accentColor={colors.ACCENT}
        t={t}
      />

      {/* Settings Modal */}
      <SettingsModal
        visible={showSettings}
        onClose={() => setShowSettings(false)}
        currentTheme={currentTheme}
        currentAccent={currentAccent}
        currentLanguage={currentLanguage}
        onThemeChange={handleThemeChange}
        onAccentChange={handleAccentChange}
        onLanguageChange={handleLanguageChange}
        onApiKeyPress={() => setShowApiKeyModal(true)}
        onAssistantNameChange={handleAssistantNameChange}
        userApiKey={userApiKey}
        assistantName={assistantName}
        colors={colors}
        t={t}
      />

      {/* API Key Modal */}
      <ApiKeyModal
        visible={showApiKeyModal}
        onClose={() => setShowApiKeyModal(false)}
        onSaveApiKey={handleSaveApiKey}
        currentApiKey={userApiKey}
        colors={colors}
        t={t}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 20,
    // borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    // marginRight removed for gap usage
  },
  appIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '400',
  },
  settingsButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
});

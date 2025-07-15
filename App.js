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
import { CONFIG, getThemeColors, validateApiKey } from './config';
import { aiService } from './services/aiService';
import { getTranslation, DEFAULT_LANGUAGE } from './languages';
import SettingsModal from './components/SettingsModal';
import ApiKeyModal from './components/ApiKeyModal';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(CONFIG.UI.DEFAULT_THEME);
  const [currentAccent, setCurrentAccent] = useState(CONFIG.UI.DEFAULT_ACCENT);
  const [currentLanguage, setCurrentLanguage] = useState(CONFIG.UI.DEFAULT_LANGUAGE);
  const [currentProvider, setCurrentProvider] = useState(CONFIG.DEFAULT_AI_PROVIDER || 'GEMINI');
  const [userApiKey, setUserApiKey] = useState('');
  const [assistantName, setAssistantName] = useState('Assistant');
  const [messageCount, setMessageCount] = useState(0); // Track user messages sent
  
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
    // Set dynamic welcome message based on API key status
    const welcomeText = aiService.isReady() 
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
      const savedProvider = await AsyncStorage.getItem('userProvider');
      const savedApiKey = await AsyncStorage.getItem('userApiKey');
      const savedAssistantName = await AsyncStorage.getItem('assistantName');
      const savedMessageCount = await AsyncStorage.getItem('messageCount');
      
      if (savedTheme) setCurrentTheme(savedTheme);
      if (savedAccent) setCurrentAccent(savedAccent);
      if (savedLanguage) setCurrentLanguage(savedLanguage);
      if (savedProvider) setCurrentProvider(savedProvider);
      if (savedApiKey) {
        setUserApiKey(savedApiKey);
        // Initialize AI service with saved provider and API key
        try {
          await aiService.initialize(savedProvider || CONFIG.DEFAULT_AI_PROVIDER, savedApiKey);
        } catch (error) {
          console.warn('Failed to initialize AI service with saved credentials:', error);
        }
      }
      if (savedAssistantName) setAssistantName(savedAssistantName);
      if (savedMessageCount) setMessageCount(parseInt(savedMessageCount));
    } catch (error) {
      console.log('No saved preferences found');
    }
  };

  const savePreferences = async (theme, accent, language, provider) => {
    try {
      await AsyncStorage.setItem('userTheme', theme);
      await AsyncStorage.setItem('userAccent', accent);
      if (language) await AsyncStorage.setItem('userLanguage', language);
      if (provider) await AsyncStorage.setItem('userProvider', provider);
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  };

  const handleThemeChange = (newTheme) => {
    setCurrentTheme(newTheme);
    savePreferences(newTheme, currentAccent, currentLanguage, currentProvider);
  };

  const handleAccentChange = (newAccent) => {
    setCurrentAccent(newAccent);
    savePreferences(currentTheme, newAccent, currentLanguage, currentProvider);
  };

  const handleLanguageChange = (newLanguage) => {
    setCurrentLanguage(newLanguage);
    savePreferences(currentTheme, currentAccent, newLanguage, currentProvider);
  };

  const handleProviderChange = (newProvider) => {
    setCurrentProvider(newProvider);
    savePreferences(currentTheme, currentAccent, currentLanguage, newProvider);
    // Reset AI service when provider changes
    aiService.reset();
    // If we have an API key, try to reinitialize with new provider
    if (userApiKey) {
      try {
        aiService.initialize(newProvider, userApiKey);
      } catch (error) {
        console.warn('Failed to initialize new provider:', error);
      }
    }
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

  const handleSaveApiKey = async (newApiKey) => {
    try {
      await AsyncStorage.setItem('userApiKey', newApiKey);
      setUserApiKey(newApiKey);
      // Reset message count when API key is added
      setMessageCount(0);
      await AsyncStorage.setItem('messageCount', '0');
      
      // Immediately initialize AI service with the new API key
      try {
        const result = await aiService.initialize(currentProvider, newApiKey);
        Alert.alert('Success!', result.message + ' You can now start chatting with unlimited messages!');
      } catch (error) {
        console.error('Failed to initialize AI with new key:', error);
        Alert.alert('API Key Error', error.message || 'Failed to initialize AI. Please check if the key is valid for the selected provider.');
      }
    } catch (error) {
      console.error('Failed to save API key:', error);
      Alert.alert('Error', 'Failed to save API key. Please try again.');
    }
  };

  const saveMessageCount = async (count) => {
    try {
      await AsyncStorage.setItem('messageCount', count.toString());
    } catch (error) {
      console.error('Failed to save message count:', error);
    }
  };

  const onSend = useCallback(async (newMessages = []) => {
    // Check message limit if no API key is set
    if (!aiService.isReady() && messageCount >= 5) {
      const providerName = CONFIG.AI_PROVIDERS[currentProvider]?.name || 'AI';
      Alert.alert(
        'Message Limit Reached', 
        `You've sent 5 messages! To continue chatting, please add your ${providerName} API key.`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Add API Key', onPress: () => setShowApiKeyModal(true) }
        ]
      );
      return;
    }

    // Check if AI is initialized
    if (!aiService.isReady()) {
      // Allow message but increment counter
      const newCount = messageCount + 1;
      setMessageCount(newCount);
      saveMessageCount(newCount);

      // Add user message
      setMessages(previousMessages => [...previousMessages, ...newMessages]);

      // Show demo response for users without API key
      setIsTyping(true);
      setTimeout(() => {
        const providerName = CONFIG.AI_PROVIDERS[currentProvider]?.name || 'AI';
        const demoResponse = {
          _id: Math.round(Math.random() * 1000000),
          text: `This is a demo response (${newCount}/5 free messages). To get real AI responses from ${providerName}, please add your API key in settings!`,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: assistantName,
            avatar: '🤖',
          },
        };
        setMessages(previousMessages => [...previousMessages, demoResponse]);
        setIsTyping(false);
      }, 1000);
      return;
    }

    // Normal flow for users with API key
    setMessages(previousMessages => [...previousMessages, ...newMessages]);
    setIsTyping(true);

    try {
      const userMessage = newMessages[0].text;
      const response = await aiService.generateResponse(userMessage);
      
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
      
      const providerName = CONFIG.AI_PROVIDERS[currentProvider]?.name || 'AI';
      let errorMessage = t('ERROR_GENERIC');
      
      // Check for quota exceeded errors
      if (error.message.includes('quota') || error.message.includes('429') || error.message.includes('exceeded')) {
        errorMessage = t('ERROR_QUOTA_EXCEEDED');
      } else if (error.message.includes('API key')) {
        errorMessage = t('ERROR_API_KEY');
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
  }, [aiService, messageCount, assistantName, currentProvider, t]);

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
              {!aiService.isReady() ? 
                (messageCount >= 5 ? 'Add API Key to Continue' : `${5 - messageCount} free messages left`) : 
                isTyping ? `${assistantName} is typing...` : `Online • ${assistantName}`
              }
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
        currentProvider={currentProvider}
        onThemeChange={handleThemeChange}
        onAccentChange={handleAccentChange}
        onLanguageChange={handleLanguageChange}
        onProviderChange={handleProviderChange}
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
        currentProvider={currentProvider}
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

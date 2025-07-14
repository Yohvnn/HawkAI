import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  Linking,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { getAccentColorOptions } from '../config';

const SettingsModal = ({ 
  visible, 
  onClose, 
  currentTheme, 
  currentAccent, 
  onThemeChange, 
  onAccentChange,
  onApiKeyPress,
  onAssistantNameChange,
  userApiKey,
  assistantName,
  colors 
}) => {
  const [tempAssistantName, setTempAssistantName] = useState(assistantName || 'Assistant');
  const accentOptions = getAccentColorOptions();

  const handleAssistantNameSave = () => {
    const trimmedName = tempAssistantName.trim();
    if (!trimmedName) {
      Alert.alert('Invalid Name', 'Please enter a valid name for your assistant.');
      return;
    }
    if (trimmedName.length > 20) {
      Alert.alert('Name Too Long', 'Please choose a name with 20 characters or less.');
      return;
    }
    onAssistantNameChange(trimmedName);
    Alert.alert('Success!', `Your assistant is now called "${trimmedName}"`);
  };

  const handleOpenCV = async () => {
    try {
      const supported = await Linking.canOpenURL('https://yohanncch.me/');
      if (supported) {
        await Linking.openURL('https://yohanncch.me/');
      } else {
        Alert.alert('Error', 'Unable to open the link');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open the link');
    }
  };

  const suggestedNames = [ 'Echo', 'Nova', 'Alter', 'Youyou', 'Kiarko', 'Tangodess', 'Bloody'];

  const handleSuggestedName = (name) => {
    setTempAssistantName(name);
  };

  const renderThemeOption = (themeKey, themeName, icon) => (
    <TouchableOpacity
      key={themeKey}
      style={[
        styles.optionButton,
        { 
          backgroundColor: colors.SECONDARY_BACKGROUND,
          borderColor: currentTheme === themeKey ? colors.ACCENT : colors.BORDER,
          borderWidth: currentTheme === themeKey ? 2 : 1,
        }
      ]}
      onPress={() => onThemeChange(themeKey)}
    >
      <Ionicons 
        name={icon} 
        size={24} 
        color={currentTheme === themeKey ? colors.ACCENT : colors.TEXT_SECONDARY} 
      />
      <Text style={[
        styles.optionText,
        { 
          color: currentTheme === themeKey ? colors.ACCENT : colors.TEXT_PRIMARY,
          fontWeight: currentTheme === themeKey ? 'bold' : 'normal',
        }
      ]}>
        {themeName}
      </Text>
      {currentTheme === themeKey && (
        <Ionicons name="checkmark-circle" size={20} color={colors.ACCENT} />
      )}
    </TouchableOpacity>
  );

  const renderAccentOption = (option) => (
    <TouchableOpacity
      key={option.name}
      style={[
        styles.colorButton,
        { 
          backgroundColor: colors.SECONDARY_BACKGROUND,
          borderColor: currentAccent === option.name ? option.color : colors.BORDER,
          borderWidth: currentAccent === option.name ? 3 : 1,
        }
      ]}
      onPress={() => onAccentChange(option.name)}
    >
      <View style={[styles.colorPreview, { backgroundColor: option.color }]} />
      <Text style={[
        styles.colorText,
        { 
          color: currentAccent === option.name ? option.color : colors.TEXT_PRIMARY,
          fontWeight: currentAccent === option.name ? 'bold' : 'normal',
        }
      ]}>
        {option.displayName}
      </Text>
      {currentAccent === option.name && (
        <Ionicons name="checkmark-circle" size={16} color={option.color} />
      )}
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={[styles.container, { backgroundColor: colors.BACKGROUND }]}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.BACKGROUND, borderBottomColor: colors.BORDER }]}>
          <Text style={[styles.headerTitle, { color: colors.TEXT_PRIMARY }]}>Settings</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={colors.TEXT_PRIMARY} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          {/* API Key Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.TEXT_PRIMARY }]}>
              🔑 API Key
            </Text>
            <Text style={[styles.sectionDescription, { color: colors.TEXT_SECONDARY }]}>
              Manage your Gemini AI API key for personalized access
            </Text>
            <TouchableOpacity
              style={[
                styles.apiKeyButton,
                { 
                  backgroundColor: colors.SECONDARY_BACKGROUND,
                  borderColor: userApiKey ? colors.ACCENT : '#FF9500',
                  borderWidth: 1,
                }
              ]}
              onPress={onApiKeyPress}
            >
              <Ionicons 
                name={userApiKey ? "key" : "key-outline"} 
                size={24} 
                color={userApiKey ? colors.ACCENT : '#FF9500'} 
              />
              <View style={styles.apiKeyInfo}>
                <Text style={[
                  styles.apiKeyTitle,
                  { color: colors.TEXT_PRIMARY }
                ]}>
                  {userApiKey ? 'Update API Key' : 'Setup API Key'}
                </Text>
                <Text style={[
                  styles.apiKeyStatus,
                  { color: userApiKey ? colors.ACCENT : '#FF9500' }
                ]}>
                  {userApiKey ? 
                    `Configured (${userApiKey.length} chars)` : 
                    'Required for AI chat'
                  }
                </Text>
              </View>
              <Ionicons 
                name="chevron-forward" 
                size={20} 
                color={colors.TEXT_SECONDARY} 
              />
            </TouchableOpacity>
          </View>

          {/* Assistant Name Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.TEXT_PRIMARY }]}>
              🤖 Assistant Name
            </Text>
            <Text style={[styles.sectionDescription, { color: colors.TEXT_SECONDARY }]}>
              Give your AI assistant a personal name
            </Text>
            <View style={styles.nameInputContainer}>
              <TextInput
                style={[
                  styles.nameInput,
                  { 
                    backgroundColor: colors.INPUT_BACKGROUND,
                    borderColor: colors.BORDER,
                    color: colors.TEXT_PRIMARY 
                  }
                ]}
                placeholder="Enter assistant name..."
                placeholderTextColor={colors.TEXT_SECONDARY}
                value={tempAssistantName}
                onChangeText={setTempAssistantName}
                maxLength={20}
                autoCapitalize="words"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: colors.ACCENT }]}
                onPress={handleAssistantNameSave}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.characterCount, { color: colors.TEXT_SECONDARY }]}>
              {tempAssistantName.length}/20 characters
            </Text>
            
            {/* Suggested Names */}
            <Text style={[styles.suggestedTitle, { color: colors.TEXT_PRIMARY }]}>
              Quick suggestions:
            </Text>
            <View style={styles.suggestedNamesContainer}>
              {suggestedNames.map((name) => (
                <TouchableOpacity
                  key={name}
                  style={[
                    styles.suggestedNameButton,
                    { 
                      backgroundColor: colors.SECONDARY_BACKGROUND,
                      borderColor: colors.BORDER,
                    }
                  ]}
                  onPress={() => handleSuggestedName(name)}
                >
                  <Text style={[styles.suggestedNameText, { color: colors.TEXT_PRIMARY }]}>
                    {name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Theme Selection */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.TEXT_PRIMARY }]}>
              🌙 Theme
            </Text>
            <Text style={[styles.sectionDescription, { color: colors.TEXT_SECONDARY }]}>
              Choose your preferred theme
            </Text>
            <View style={styles.optionsContainer}>
              {renderThemeOption('LIGHT', 'Light Mode', 'sunny')}
              {renderThemeOption('DARK', 'Dark Mode', 'moon')}
            </View>
          </View>

          {/* Accent Color Selection */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.TEXT_PRIMARY }]}>
              🎨 Accent Color
            </Text>
            <Text style={[styles.sectionDescription, { color: colors.TEXT_SECONDARY }]}>
              Customize your app's accent color
            </Text>
            <View style={styles.colorsGrid}>
              {accentOptions.map(renderAccentOption)}
            </View>
          </View>

          {/* Preview */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.TEXT_PRIMARY }]}>
              👀 Preview
            </Text>
            <View style={[styles.previewContainer, { backgroundColor: colors.SECONDARY_BACKGROUND, borderColor: colors.BORDER }]}>
              <View style={[styles.previewBubble, { backgroundColor: colors.BUBBLE_USER }]}>
                <Text style={[styles.previewText, { color: colors.BUBBLE_TEXT_USER }]}>
                  Your message
                </Text>
              </View>
              <View style={[styles.previewBubble, { backgroundColor: colors.BUBBLE_ASSISTANT, alignSelf: 'flex-start' }]}>
                <Text style={[styles.previewText, { color: colors.BUBBLE_TEXT_ASSISTANT }]}>
                  Assistant response
                </Text>
              </View>
            </View>
          </View>

          {/* Credits */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.TEXT_PRIMARY }]}>
              ℹ️ Credits
            </Text>
            <View style={[styles.creditsContainer, { backgroundColor: colors.SECONDARY_BACKGROUND, borderColor: colors.BORDER }]}>
              <Text style={[styles.creditsText, { color: colors.TEXT_SECONDARY }]}>
                <Text style={[styles.creditsBold, { color: colors.TEXT_PRIMARY }]}>HawkAI</Text>
                {'\n'}Developed by{' '}
              </Text>
              <TouchableOpacity onPress={handleOpenCV} style={styles.developerLink}>
                <Text style={[styles.creditsBold, styles.clickableText, { color: colors.ACCENT }]}>
                  Yohann Chan Chew Hong
                </Text>
              </TouchableOpacity>
              <Text style={[styles.creditsText, { color: colors.TEXT_SECONDARY }]}>
                {'\n'}Powered by Google Gemini AI
                {'\n'}Built with React Native & Expo
                {'\n\n'}🦅 BloodyHawk Gaming
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionDescription: {
    fontSize: 14,
    marginBottom: 15,
  },
  optionsContainer: {
    gap: 10,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    gap: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
  },
  colorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  colorButton: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    gap: 8,
  },
  colorPreview: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  colorText: {
    flex: 1,
    fontSize: 14,
  },
  previewContainer: {
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    gap: 10,
  },
  previewBubble: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 18,
    maxWidth: '80%',
    alignSelf: 'flex-end',
  },
  previewText: {
    fontSize: 14,
  },
  apiKeyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    gap: 12,
  },
  apiKeyInfo: {
    flex: 1,
  },
  apiKeyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  apiKeyStatus: {
    fontSize: 14,
  },
  nameInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  nameInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  characterCount: {
    fontSize: 12,
    marginTop: 5,
    textAlign: 'right',
  },
  suggestedTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
  },
  suggestedNamesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  suggestedNameButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  suggestedNameText: {
    fontSize: 14,
    fontWeight: '500',
  },
  creditsContainer: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 8,
  },
  creditsText: {
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
  },
  creditsBold: {
    fontWeight: '600',
    fontSize: 14,
  },
  developerLink: {
    alignSelf: 'center',
  },
  clickableText: {
    textDecorationLine: 'underline',
  },
});

export default SettingsModal;

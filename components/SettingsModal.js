import React, { useState, useEffect } from 'react';
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
  BackHandler,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { getAccentColorOptions } from '../config';
import { getAvailableLanguages } from '../languages';

const SettingsModal = ({
  visible,
  onClose,
  currentTheme,
  currentAccent,
  currentLanguage,
  onThemeChange,
  onAccentChange,
  onLanguageChange,
  onApiKeyPress,
  onAssistantNameChange,
  userApiKey,
  assistantName,
  colors,
  t
}) => {
  const [tempAssistantName, setTempAssistantName] = useState(assistantName || t('ASSISTANT_NAME_DEFAULT'));
  const accentOptions = getAccentColorOptions(t);
  const languageOptions = getAvailableLanguages();

  // Handle Android back button
  useEffect(() => {
    const backAction = () => {
      if (visible) {
        onClose();
        return true; // Prevent default behavior
      }
      return false; // Allow default behavior
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [visible, onClose]);

  const handleAssistantNameSave = () => {
    const trimmedName = tempAssistantName.trim();
    if (!trimmedName) {
      Alert.alert(t('ERROR'), t('ASSISTANT_NAME_INVALID'));
      return;
    }
    if (trimmedName.length > 20) {
      Alert.alert(t('ERROR'), t('ASSISTANT_NAME_TOO_LONG'));
      return;
    }
    onAssistantNameChange(trimmedName);
    Alert.alert(t('SUCCESS'), `${t('ASSISTANT_NAME_SUCCESS')} "${trimmedName}"`);
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

  const suggestedNames = ['Echo', 'Nova', 'Alter', 'Youyou', 'Kiarko', 'Tangodess', 'Bloody'];

  const handleSuggestedName = (name) => {
    setTempAssistantName(name);
  };

  const renderThemeOption = (themeKey, themeName, icon) => (
    <TouchableOpacity
      key={themeKey}
      style={[
        styles.optionButton,
        {
          backgroundColor: colors.CARD,
          borderColor: currentTheme === themeKey ? colors.ACCENT : colors.BORDER,
          borderWidth: 1,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: currentTheme === themeKey ? 0.1 : 0.05,
          shadowRadius: 2,
          elevation: currentTheme === themeKey ? 2 : 1,
        }
      ]}
      onPress={() => onThemeChange(themeKey)}
    >
      <Ionicons
        name={icon}
        size={22}
        color={currentTheme === themeKey ? colors.ACCENT : colors.TEXT_MUTED}
      />
      <Text style={[
        styles.optionText,
        {
          color: currentTheme === themeKey ? colors.ACCENT : colors.TEXT_PRIMARY,
          fontWeight: currentTheme === themeKey ? '600' : '400',
        }
      ]}>
        {themeName}
      </Text>
      {currentTheme === themeKey && (
        <Ionicons name="checkmark-circle" size={18} color={colors.ACCENT} />
      )}
    </TouchableOpacity>
  );

  const renderLanguageOption = (language) => (
    <TouchableOpacity
      key={language.code}
      style={[
        styles.optionButton,
        {
          backgroundColor: colors.CARD,
          borderColor: currentLanguage === language.code ? colors.ACCENT : colors.BORDER,
          borderWidth: 1,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: currentLanguage === language.code ? 0.1 : 0.05,
          shadowRadius: 2,
          elevation: currentLanguage === language.code ? 2 : 1,
        }
      ]}
      onPress={() => onLanguageChange(language.code)}
    >
      <Ionicons
        name="language"
        size={22}
        color={currentLanguage === language.code ? colors.ACCENT : colors.TEXT_MUTED}
      />
      <Text style={[
        styles.optionText,
        {
          color: currentLanguage === language.code ? colors.ACCENT : colors.TEXT_PRIMARY,
          fontWeight: currentLanguage === language.code ? '600' : '400',
        }
      ]}>
        {language.name}
      </Text>
      {currentLanguage === language.code && (
        <Ionicons name="checkmark-circle" size={18} color={colors.ACCENT} />
      )}
    </TouchableOpacity>
  );

  const renderAccentOption = (option) => (
    <TouchableOpacity
      key={option.name}
      style={[
        styles.colorButton,
        {
          backgroundColor: colors.CARD,
          borderColor: currentAccent === option.name ? option.color : colors.BORDER,
          borderWidth: 1,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: currentAccent === option.name ? 0.1 : 0.05,
          shadowRadius: 2,
          elevation: currentAccent === option.name ? 2 : 1,
        }
      ]}
      onPress={() => onAccentChange(option.name)}
    >
      <View style={[styles.colorPreview, { backgroundColor: option.color }]} />
      <Text style={[
        styles.colorText,
        {
          color: currentAccent === option.name ? option.color : colors.TEXT_PRIMARY,
          fontWeight: currentAccent === option.name ? '600' : '400',
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
      onRequestClose={onClose}
    >
      <SafeAreaView style={[styles.container, { backgroundColor: colors.BACKGROUND }]}>
        {/* Header */}
        <View style={[styles.header, {
          backgroundColor: colors.BACKGROUND,
          borderBottomColor: colors.BORDER,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 1,
        }]}>
          <Text style={[styles.headerTitle, {
            color: colors.TEXT_PRIMARY,
            fontWeight: '600',
            fontSize: 18,
          }]}>{t('SETTINGS_TITLE')}</Text>
          <TouchableOpacity onPress={onClose} style={[styles.closeButton, {
            backgroundColor: colors.BACKGROUND,
            borderRadius: 6,
            padding: 6,
          }]}>
            <Ionicons name="chevron-down" size={20} color={colors.TEXT_MUTED} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          {/* API Key Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.TEXT_PRIMARY }]}>
              {t('API_KEY_SECTION')}
            </Text>
            <Text style={[styles.sectionDescription, { color: colors.TEXT_SECONDARY }]}>
              {t('API_KEY_DESCRIPTION')}
            </Text>
            <TouchableOpacity
              style={[
                styles.apiKeyButton,
                {
                  backgroundColor: colors.CARD,
                  borderColor: userApiKey ? colors.ACCENT : '#FF9500',
                  borderWidth: 1,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 2,
                  elevation: 1,
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
                  {userApiKey ? t('API_KEY_UPDATE') : t('API_KEY_SETUP')}
                </Text>
                <Text style={[
                  styles.apiKeyStatus,
                  { color: userApiKey ? colors.ACCENT : '#FF9500' }
                ]}>
                  {userApiKey ?
                    `${t('API_KEY_CONFIGURED')} (${userApiKey.length} chars)` :
                    t('API_KEY_REQUIRED')
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
              {t('ASSISTANT_NAME_SECTION')}
            </Text>
            <Text style={[styles.sectionDescription, { color: colors.TEXT_SECONDARY }]}>
              {t('ASSISTANT_NAME_DESCRIPTION')}
            </Text>
            <View style={styles.nameInputContainer}>
              <TextInput
                style={[
                  styles.nameInput,
                  {
                    backgroundColor: colors.CARD,
                    borderColor: colors.BORDER,
                    color: colors.TEXT_PRIMARY,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 2,
                    elevation: 1,
                  }
                ]}
                placeholder={t('ASSISTANT_NAME_PLACEHOLDER')}
                placeholderTextColor={colors.TEXT_MUTED}
                value={tempAssistantName}
                onChangeText={setTempAssistantName}
                maxLength={20}
                autoCapitalize="words"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={[styles.saveButton, {
                  backgroundColor: colors.ACCENT + '20',
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                }]}
                onPress={handleAssistantNameSave}
              >

                <Ionicons name="save" size={20} color={colors.ACCENT} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.characterCount, { color: colors.TEXT_SECONDARY }]}>
              {tempAssistantName.length}/20 {t('ASSISTANT_NAME_CHARACTERS')}
            </Text>

            {/* Suggested Names */}
            <Text style={[styles.suggestedTitle, { color: colors.TEXT_PRIMARY }]}>
              {t('ASSISTANT_NAME_SUGGESTIONS')}
            </Text>
            <View style={styles.suggestedNamesContainer}>
              {suggestedNames.map((name) => (
                <TouchableOpacity
                  key={name}
                  style={[
                    styles.suggestedNameButton,
                    {
                      backgroundColor: colors.CARD,
                      borderColor: colors.BORDER,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.05,
                      shadowRadius: 2,
                      elevation: 1,
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

          {/* Language Selection */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.TEXT_PRIMARY }]}>
              {t('LANGUAGE_SECTION')}
            </Text>
            <Text style={[styles.sectionDescription, { color: colors.TEXT_SECONDARY }]}>
              {t('LANGUAGE_DESCRIPTION')}
            </Text>
            <View style={styles.optionsContainer}>
              {languageOptions.map(renderLanguageOption)}
            </View>
          </View>

          {/* Theme Selection */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.TEXT_PRIMARY }]}>
              {t('THEME_SECTION')}
            </Text>
            <Text style={[styles.sectionDescription, { color: colors.TEXT_SECONDARY }]}>
              {t('THEME_DESCRIPTION')}
            </Text>
            <View style={styles.optionsContainer}>
              {renderThemeOption('SYSTEM', t('THEME_SYSTEM'), 'phone-portrait')}
              {renderThemeOption('LIGHT', t('THEME_LIGHT'), 'sunny')}
              {renderThemeOption('DARK', t('THEME_DARK'), 'moon')}
            </View>
          </View>

          {/* Accent Color Selection */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.TEXT_PRIMARY }]}>
              {t('ACCENT_COLOR_SECTION')}
            </Text>
            <Text style={[styles.sectionDescription, { color: colors.TEXT_SECONDARY }]}>
              {t('ACCENT_COLOR_DESCRIPTION')}
            </Text>
            <View style={styles.colorsGrid}>
              {accentOptions.map(renderAccentOption)}
            </View>
          </View>

          {/* Preview */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.TEXT_PRIMARY }]}>
              {t('PREVIEW_SECTION')}
            </Text>
            <View style={[styles.previewContainer, {
              backgroundColor: colors.BACKGROUND,
              borderColor: colors.BORDER,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 1,
            }]}>
              <View style={[styles.previewBubble, {
                backgroundColor: colors.ACCENT,
                borderRadius: 12,
                borderBottomRightRadius: 4,
                padding: 14,
                alignSelf: 'flex-end',
                marginBottom: 8,
                maxWidth: '80%',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 1,
              }]}>
                <Text style={[styles.previewText, {
                  color: '#FFFFFF',
                  fontSize: 16,
                  lineHeight: 22,
                  fontWeight: '400',
                }]}>
                  {t('PREVIEW_USER_MESSAGE')}
                </Text>
              </View>
              <View style={[styles.previewBubble, {
                backgroundColor: colors.CARD,
                borderRadius: 12,
                borderBottomLeftRadius: 4,
                borderWidth: 1,
                borderColor: colors.BORDER,
                padding: 14,
                alignSelf: 'flex-start',
                maxWidth: '80%',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 1,
              }]}>
                <Text style={[styles.previewText, {
                  color: colors.TEXT_PRIMARY,
                  fontSize: 16,
                  lineHeight: 22,
                  fontWeight: '400',
                }]}>
                  {t('PREVIEW_ASSISTANT_MESSAGE')}
                </Text>
              </View>
            </View>
          </View>

          {/* Credits */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.TEXT_PRIMARY }]}>
              {t('CREDITS_SECTION')}
            </Text>
            <View style={[styles.creditsContainer, {
              backgroundColor: colors.CARD,
              borderColor: colors.BORDER,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 1,
            }]}>
              <Text style={[styles.creditsText, { color: colors.TEXT_SECONDARY }]}>
                <Text style={[styles.creditsBold, { color: colors.TEXT_PRIMARY }]}>HawkAI</Text>
                {'\n'}{t('CREDITS_DEVELOPED_BY')}{' '}
              </Text>
              <TouchableOpacity onPress={handleOpenCV} style={styles.developerLink}>
                <Text style={[styles.creditsBold, styles.clickableText, { color: colors.ACCENT }]}>
                  Yohann Chan Chew Hong
                </Text>
              </TouchableOpacity>
              <Text style={[styles.creditsText, { color: colors.TEXT_SECONDARY }]}>
                {''}{t('CREDITS_POWERED_BY')}
                {'\n'}{t('CREDITS_BUILT_WITH')}
                {'\n\n'}{t('CREDITS_COMPANY')}
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
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
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

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const ApiKeyModal = ({
  visible,
  onClose,
  onSaveApiKey,
  currentApiKey = '',
  colors
}) => {
  const [apiKey, setApiKey] = useState(currentApiKey);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleSave = () => {
    if (!apiKey.trim()) {
      Alert.alert('Error', 'Please enter a valid API key');
      return;
    }

    // Basic validation for Gemini API key format
    if (!apiKey.startsWith('AIza') || apiKey.length < 35) {
      Alert.alert(
        'Invalid API Key',
        'This doesn\'t look like a valid Gemini API key. Gemini API keys typically start with "AIza" and are longer than 35 characters.'
      );
      return;
    }

    onSaveApiKey(apiKey.trim());
    onClose();
  };

  const openGeminiAPIPage = () => {
    Linking.openURL('https://makersuite.google.com/app/apikey');
  };

  const renderInstructions = () => (
    <View style={[styles.instructionsContainer, { backgroundColor: colors.SECONDARY_BACKGROUND }]}>
      <Text style={[styles.instructionsTitle, { color: colors.TEXT_PRIMARY }]}>
        How to Get Your Gemini API Key
      </Text>

      <View style={styles.step}>
        <Text style={[styles.stepNumber, { color: colors.ACCENT }]}>1.</Text>
        <Text style={[styles.stepText, { color: colors.TEXT_PRIMARY }]}>
          Visit Google AI Studio and sign in with your Google account
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.linkButton, { backgroundColor: colors.ACCENT }]}
        onPress={openGeminiAPIPage}
      >
        <Ionicons name="open-outline" size={20} color="#FFFFFF" />
        <Text style={styles.linkButtonText}>Open Google AI Studio</Text>
      </TouchableOpacity>

      <View style={styles.step}>
        <Text style={[styles.stepNumber, { color: colors.ACCENT }]}>2.</Text>
        <Text style={[styles.stepText, { color: colors.TEXT_PRIMARY }]}>
          Click "Get API Key" or "Create API Key" button
        </Text>
      </View>

      <View style={styles.step}>
        <Text style={[styles.stepNumber, { color: colors.ACCENT }]}>3.</Text>
        <Text style={[styles.stepText, { color: colors.TEXT_PRIMARY }]}>
          Create a new project or select an existing one
        </Text>
      </View>

      <View style={styles.step}>
        <Text style={[styles.stepNumber, { color: colors.ACCENT }]}>4.</Text>
        <Text style={[styles.stepText, { color: colors.TEXT_PRIMARY }]}>
          Copy the generated API key (starts with "AIza...")
        </Text>
      </View>

      <View style={styles.step}>
        <Text style={[styles.stepNumber, { color: colors.ACCENT }]}>5.</Text>
        <Text style={[styles.stepText, { color: colors.TEXT_PRIMARY }]}>
          Paste it in the field below and save
        </Text>
      </View>

      <View style={[styles.note, { backgroundColor: colors.MESSAGE_BUBBLE, borderColor: colors.BORDER }]}>
        <Ionicons name="information-circle-outline" size={20} color={colors.ACCENT} />
        <Text style={[styles.noteText, { color: colors.TEXT_SECONDARY }]}>
          Your API key is stored locally on your device and never shared with anyone.
        </Text>
      </View>

      <View style={[styles.note, { backgroundColor: colors.MESSAGE_BUBBLE, borderColor: colors.BORDER }]}>
        <Ionicons name="warning-outline" size={20} color="#FF9500" />
        <Text style={[styles.noteText, { color: colors.TEXT_SECONDARY }]}>
          Keep your API key secure! Don't share it with others or post it publicly.
        </Text>
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.BACKGROUND }}>
        {/* Header */}
        <BlurView intensity={0} style={styles.header}>
        <View style={[styles.headerContent, { backgroundColor: colors.backgroundColor, borderBottomColor: colors.BORDER }]}>
            <TouchableOpacity onPress={onClose} style={styles.headerButton}>
              <Ionicons name="close" size={24} color={colors.TEXT_PRIMARY} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: colors.TEXT_PRIMARY }]}>API Key Settings</Text>
            <TouchableOpacity onPress={handleSave} style={styles.headerButton}>
              <Text style={[styles.saveText, { color: colors.ACCENT }]}>Save</Text>
            </TouchableOpacity>
          </View>
        </BlurView>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={true}>
          {/* API Key Input Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.TEXT_PRIMARY }]}>
              Your Gemini API Key
            </Text>
            <Text style={[styles.sectionDescription, { color: colors.TEXT_SECONDARY }]}>
              Enter your personal Gemini API key to start chatting with AI
            </Text>

            <TextInput
              style={[
                styles.apiKeyInput,
                {
                  backgroundColor: colors.INPUT_BACKGROUND,
                  borderColor: colors.BORDER,
                  color: colors.TEXT_PRIMARY
                }
              ]}
              placeholder="AIza... (paste your Gemini API key here)"
              placeholderTextColor={colors.TEXT_SECONDARY}
              value={apiKey}
              onChangeText={setApiKey}
              multiline
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={false}
            />

            {apiKey ? (
              <View style={styles.keyStatus}>
                <Ionicons
                  name="checkmark-circle"
                  size={16}
                  color="#28A745"
                />
                <Text style={[styles.keyStatusText, { color: '#28A745' }]}>
                  API key entered ({apiKey.length} characters)
                </Text>
              </View>
            ) : (
              <View style={styles.keyStatus}>
                <Ionicons
                  name="alert-circle-outline"
                  size={16}
                  color="#FF9500"
                />
                <Text style={[styles.keyStatusText, { color: '#FF9500' }]}>
                  No API key entered
                </Text>
              </View>
            )}
          </View>

          {/* Instructions Toggle */}
          <TouchableOpacity
            style={[styles.instructionsToggle, { backgroundColor: colors.SECONDARY_BACKGROUND }]}
            onPress={() => setShowInstructions(!showInstructions)}
          >
            <View style={styles.toggleContent}>
              <Text style={[styles.toggleText, { color: colors.TEXT_PRIMARY }]}>
                How to get your API key
              </Text>
              <Ionicons
                name={showInstructions ? "chevron-up" : "chevron-down"}
                size={20}
                color={colors.TEXT_SECONDARY}
              />
            </View>
          </TouchableOpacity>

          {/* Instructions */}
          {showInstructions && renderInstructions()}

          {/* Benefits Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.TEXT_PRIMARY }]}>
              Why Your Own API Key?
            </Text>

            <View style={styles.benefit}>
              <Ionicons name="flash-outline" size={20} color={colors.ACCENT} />
              <Text style={[styles.benefitText, { color: colors.TEXT_PRIMARY }]}>
                <Text style={{ fontWeight: 'bold' }}>Better Performance:</Text> Direct connection to Google's AI
              </Text>
            </View>

            <View style={styles.benefit}>
              <Ionicons name="lock-closed-outline" size={20} color={colors.ACCENT} />
              <Text style={[styles.benefitText, { color: colors.TEXT_PRIMARY }]}>
                <Text style={{ fontWeight: 'bold' }}>Privacy:</Text> Your conversations stay between you and Google
              </Text>
            </View>

            <View style={styles.benefit}>
              <Ionicons name="trending-down-outline" size={20} color={colors.ACCENT} />
              <Text style={[styles.benefitText, { color: colors.TEXT_PRIMARY }]}>
                <Text style={{ fontWeight: 'bold' }}>Cost Control:</Text> You control your own usage and costs
              </Text>
            </View>

            <View style={styles.benefit}>
              <Ionicons name="infinite-outline" size={20} color={colors.ACCENT} />
              <Text style={[styles.benefitText, { color: colors.TEXT_PRIMARY }]}>
                <Text style={{ fontWeight: 'bold' }}>No Limits:</Text> Use the app as much as you want
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  saveText: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 16,
  },
  apiKeyInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  keyStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  keyStatusText: {
    marginLeft: 6,
    fontSize: 14,
  },
  instructionsToggle: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  toggleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
  },
  instructionsContainer: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  stepNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 12,
    minWidth: 24,
  },
  stepText: {
    fontSize: 16,
    lineHeight: 22,
    flex: 1,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginVertical: 12,
  },
  linkButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  note: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 12,
  },
  noteText: {
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 8,
    flex: 1,
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  benefitText: {
    fontSize: 16,
    lineHeight: 22,
    marginLeft: 12,
    flex: 1,
  },
});

export default ApiKeyModal;

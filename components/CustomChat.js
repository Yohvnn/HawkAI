import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

const CustomChat = ({ 
  messages = [], 
  onSend, 
  user,
  isLoading = false,
  theme,
  accentColor,
  t
}) => {
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef();

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim().length === 0) return;
    
    const message = {
      _id: Date.now().toString(),
      text: inputText.trim(),
      createdAt: new Date(),
      user: user,
    };
    
    onSend([message]);
    setInputText('');
  };

  const handleCopyMessage = async (text) => {
    try {
      await Clipboard.setStringAsync(text);
      Alert.alert('Copied', 'Message copied to clipboard');
    } catch (error) {
      Alert.alert('Error', 'Failed to copy message');
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const renderMessage = (message, index) => {
    const isUser = message.user._id === user._id;
    const isLastMessage = index === messages.length - 1;

    return (
      <View
        key={message._id}
        style={{
          flexDirection: 'row',
          justifyContent: isUser ? 'flex-end' : 'flex-start',
          marginBottom: isLastMessage ? 20 : 10,
          paddingHorizontal: 16,
        }}
      >
        <TouchableOpacity
          onLongPress={() => handleCopyMessage(message.text)}
          style={{
            maxWidth: '80%',
          }}
        >
          {isUser ? (
            <View
              style={{
                backgroundColor: accentColor,
                padding: 12,
                borderRadius: 18,
                borderBottomRightRadius: 4,
              }}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 16 }}>
                {message.text}
              </Text>
              <Text style={{ 
                color: '#FFFFFF90', 
                fontSize: 12, 
                marginTop: 4,
                textAlign: 'right' 
              }}>
                {formatTime(message.createdAt)}
              </Text>
            </View>
          ) : (
            <View
              style={{
                backgroundColor: theme.MESSAGE_BUBBLE,
                padding: 12,
                borderRadius: 18,
                borderBottomLeftRadius: 4,
                borderWidth: 1,
                borderColor: theme.BORDER,
              }}
            >
              <Text style={{ 
                color: theme.TEXT_PRIMARY, 
                fontSize: 16 
              }}>
                {message.text}
              </Text>
              <Text style={{ 
                color: theme.TEXT_SECONDARY, 
                fontSize: 12, 
                marginTop: 4 
              }}>
                {formatTime(message.createdAt)}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={{ flex: 1, backgroundColor: theme.BACKGROUND }}
        contentContainerStyle={{ paddingTop: 10, flexGrow: 0 }}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message, index) => renderMessage(message, index))}
        
        {/* Loading indicator */}
        {isLoading && (
          <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginBottom: 20,
            paddingHorizontal: 16,
          }}>
            <View style={{
              backgroundColor: theme.MESSAGE_BUBBLE,
              padding: 16,
              borderRadius: 18,
              borderBottomLeftRadius: 4,
              borderWidth: 1,
              borderColor: theme.BORDER,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <ActivityIndicator 
                size="small" 
                color={accentColor}
                style={{ marginRight: 8 }}
              />
              <Text style={{ 
                color: theme.TEXT_SECONDARY,
                fontSize: 14,
                fontStyle: 'italic'
              }}>
                {t ? t('ASSISTANT_TYPING') : 'Thinking...'}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <View style={{
        backgroundColor: theme.BACKGROUND,
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: Platform.OS === 'ios' ? 10 : 0,
        marginBottom: Platform.OS === 'android' ? 10 : 0,
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          backgroundColor: theme.INPUT_BACKGROUND,
          borderRadius: 24,
          paddingHorizontal: 16,
          paddingVertical: 4,
          minHeight: 44,
        }}>
          <TextInput
            style={{
              flex: 1,
              fontSize: 16,
              color: theme.TEXT_PRIMARY,
              maxHeight: 100,
              paddingVertical: 8,
            }}
            placeholder={t ? t('CHAT_PLACEHOLDER') : 'Type a message...'}
            placeholderTextColor={theme.TEXT_SECONDARY}
            value={inputText}
            onChangeText={setInputText}
            multiline
            textAlignVertical="top"
            onSubmitEditing={handleSend}
            blurOnSubmit={false}
          />
          
          <TouchableOpacity
            onPress={handleSend}
            disabled={inputText.trim().length === 0 || isLoading}
            style={{
              marginLeft: 8,
              padding: 8,
            }}
          >
            <Ionicons
              name="send"
              size={24}
              color={
                inputText.trim().length === 0 || isLoading 
                  ? theme.TEXT_SECONDARY 
                  : accentColor
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CustomChat;

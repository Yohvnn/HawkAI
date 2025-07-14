// Configuration file for the Personal Assistant app
// This file contains settings for API integration and app behavior

export const CONFIG = {
  // Gemini AI Configuration
  GEMINI: {
    // Get your API key from: https://makersuite.google.com/app/apikey
    API_KEY: process.env.EXPO_PUBLIC_GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY_HERE', // Will be loaded from environment
    MODEL_NAME: 'gemini-1.5-flash', // Most cost-effective model
    MAX_TOKENS: 150, // Limit response length for cost control
    TEMPERATURE: 0.7, // Controls randomness (0.0 to 1.0)
  },

  // App Settings
  APP: {
    NAME: 'HawkAI',
    VERSION: '1.0.0',
    WELCOME_MESSAGE: `Hello! I'm your personal assistant powered by Gemini AI. 💫

I'm designed to be lightweight, fast, and straightforward - your go-to for quick questions when in doubt:
• Instant answers to quick questions
• Minimal storage footprint
• Straightforward information lookup
• Simple task assistance
• Daily planning on the go

What would you like to know?`,
  },


  // UI Settings
  UI: {
    // Available accent colors with darker shades for better text visibility
    ACCENT_COLORS: {
      UNICORN_DREAMS: '#7B68B8',    // Darker Purple
      BUBBLEGUM_POP: '#E91E63',     // Darker Pink
      MINTY_FRESH: '#4CAF50',       // Darker Green
      SUNSET_VIBES: '#F44336',      // Darker Red/Coral
      PEACHY_KEEN: '#FF9800',       // Darker Orange
      COTTON_CANDY: '#FFC107',      // Darker Yellow
      SKY_DREAMS: '#2196F3',        // Darker Blue
      LAVENDER_LOVE: '#9C27B0',     // Darker Lavender/Purple
      MERMAID_TAIL: '#009688',      // Darker Teal
      FLAMINGO_SASS: '#E91E63',     // Darker Pink-Red
    },
    
    // Theme configurations
    THEMES: {
      LIGHT: {
        BACKGROUND: '#FFFFFF',
        SECONDARY_BACKGROUND: '#F8F9FA',
        TEXT_PRIMARY: '#000000',
        TEXT_SECONDARY: '#666666',
        BUBBLE_USER: '#007AFF', // Will be replaced by selected accent
        BUBBLE_ASSISTANT: '#F0F0F0',
        BUBBLE_TEXT_USER: '#FFFFFF',
        BUBBLE_TEXT_ASSISTANT: '#000000',
        INPUT_BACKGROUND: '#eeeeeeff',
        MESSAGE_BUBBLE: '#F0F0F0',
        BORDER: '#E1E8ED',
        HEADER_TEXT: '#FFFFFF',
        STATUS_BAR: 'dark',
      },
      DARK: {
        BACKGROUND: '#000000',
        SECONDARY_BACKGROUND: '#1C1C1E',
        TEXT_PRIMARY: '#FFFFFF',
        TEXT_SECONDARY: '#999999',
        BUBBLE_USER: '#007AFF', // Will be replaced by selected accent
        BUBBLE_ASSISTANT: '#2C2C2E',
        BUBBLE_TEXT_USER: '#FFFFFF',
        BUBBLE_TEXT_ASSISTANT: '#FFFFFF',
        INPUT_BACKGROUND: '#1C1C1E',
        MESSAGE_BUBBLE: '#2C2C2E',
        BORDER: '#38383A',
        HEADER_TEXT: '#FFFFFF',
        STATUS_BAR: 'light',
      },
    },
    
    // Default settings
    DEFAULT_THEME: 'SYSTEM',
    DEFAULT_ACCENT: 'UNICORN_DREAMS',
    DEFAULT_LANGUAGE: 'en',
  },

  // Cost Optimization Settings
  OPTIMIZATION: {
    // Reduce API calls by limiting message length
    MAX_MESSAGE_LENGTH: 500,
    // Enable message compression for longer conversations
    ENABLE_COMPRESSION: true,
    // Cache responses for common queries
    ENABLE_CACHING: false, // Implement if needed
  },
};

// Validation function for API key
export const validateApiKey = (apiKey) => {
  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
    return {
      isValid: false,
      message: 'Please add your Gemini API key in config.js',
    };
  }
  
  if (apiKey.length < 10) {
    return {
      isValid: false,
      message: 'API key appears to be invalid',
    };
  }

  return {
    isValid: true,
    message: 'API key is configured',
  };
};

// Helper function to optimize prompts for cost efficiency
export const optimizePrompt = (userMessage) => {
  // Keep prompts concise to reduce token usage
  const basePrompt = "As a helpful personal assistant, provide a concise, practical response to: ";
  
  // Trim and limit message length
  const trimmedMessage = userMessage.trim().substring(0, CONFIG.OPTIMIZATION.MAX_MESSAGE_LENGTH);
  
  return basePrompt + trimmedMessage;
};

// Theme management functions
export const getThemeColors = (themeName, accentColor) => {
  const theme = CONFIG.UI.THEMES[themeName] || CONFIG.UI.THEMES[CONFIG.UI.DEFAULT_THEME];
  const accent = CONFIG.UI.ACCENT_COLORS[accentColor] || CONFIG.UI.ACCENT_COLORS[CONFIG.UI.DEFAULT_ACCENT];
  
  // Create a copy of the theme and replace accent colors
  const colors = { ...theme };
  colors.BUBBLE_USER = accent;
  colors.ACCENT = accent;
  
  // Generate gradient colors based on accent
  colors.ACCENT_LIGHT = accent + '80'; // 50% opacity
  
  return colors;
};

// Get available accent color options
export const getAccentColorOptions = (t) => {
  const colorNames = {
    UNICORN_DREAMS: t ? t('COLOR_UNICORN_DREAMS') : 'Unicorn Dreams',
    BUBBLEGUM_POP: t ? t('COLOR_BUBBLEGUM_POP') : 'Bubblegum Pop',
    MINTY_FRESH: t ? t('COLOR_MINTY_FRESH') : 'Minty Fresh',
    SUNSET_VIBES: t ? t('COLOR_SUNSET_VIBES') : 'Sunset Vibes',
    PEACHY_KEEN: t ? t('COLOR_PEACHY_KEEN') : 'Peachy Keen',
    COTTON_CANDY: t ? t('COLOR_COTTON_CANDY') : 'Cotton Candy',
    SKY_DREAMS: t ? t('COLOR_SKY_DREAMS') : 'Sky Dreams',
    LAVENDER_LOVE: t ? t('COLOR_LAVENDER_LOVE') : 'Lavender Love',
    MERMAID_TAIL: t ? t('COLOR_MERMAID_TAIL') : 'Mermaid Tail',
    FLAMINGO_SASS: t ? t('COLOR_FLAMINGO_SASS') : 'Flamingo Sass',
  };
  
  return Object.keys(CONFIG.UI.ACCENT_COLORS).map(key => ({
    name: key,
    color: CONFIG.UI.ACCENT_COLORS[key],
    displayName: colorNames[key] || key,
  }));
};

export default CONFIG;

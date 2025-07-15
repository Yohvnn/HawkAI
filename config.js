// Configuration file for the Personal Assistant app
// This file contains settings for API integration and app behavior

export const CONFIG = {
  // AI Provider Configuration
  AI_PROVIDERS: {
    GEMINI: {
      name: 'Google Gemini',
      // Get your API key from: https://makersuite.google.com/app/apikey
      API_KEY: process.env.EXPO_PUBLIC_GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY_HERE',
      MODEL_NAME: 'gemini-1.5-flash', // Most cost-effective model
      MAX_TOKENS: 150,
      TEMPERATURE: 0.7,
    },
    OPENAI: {
      name: 'OpenAI GPT',
      // Get your API key from: https://platform.openai.com/api-keys
      API_KEY: process.env.EXPO_PUBLIC_OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY_HERE',
      MODEL_NAME: 'gpt-3.5-turbo', // Most cost-effective model
      MAX_TOKENS: 150,
      TEMPERATURE: 0.7,
    },
  },

  // Gemini AI Configuration (for backward compatibility)
  GEMINI: {
    API_KEY: process.env.EXPO_PUBLIC_GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY_HERE',
    MODEL_NAME: 'gemini-1.5-flash',
    MAX_TOKENS: 150,
    TEMPERATURE: 0.7,
  },

  // App Settings
  APP: {
    NAME: 'HawkAI',
    VERSION: '1.0.0',
    WELCOME_MESSAGE: `Hello! I'm your personal assistant powered by Gemini AI. 

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
    // Available accent colors with vibrant shades for better visual appeal
    ACCENT_COLORS: {
      UNICORN_DREAMS: '#8B5CF6',    // Vibrant Purple
      BUBBLEGUM_POP: '#EC4899',     // Vibrant Pink
      MINTY_FRESH: '#10B981',       // Vibrant Green
      SUNSET_VIBES: '#F59E0B',      // Vibrant Orange
      PEACHY_KEEN: '#EF4444',       // Vibrant Red
      COTTON_CANDY: '#06B6D4',      // Vibrant Cyan
      SKY_DREAMS: '#3B82F6',        // Vibrant Blue
      LAVENDER_LOVE: '#A855F7',     // Vibrant Lavender
      MERMAID_TAIL: '#14B8A6',      // Vibrant Teal
      MONOCHROME: '#828282ff',            // Default for custom hex input
    },

    // shadcn/ui inspired themes
    THEMES: {
      LIGHT: {
        BACKGROUND: '#ffffff',
        CARD: '#ffffff',
        POPOVER: '#ffffff',
        TEXT_PRIMARY: '#0a0a0a',
        TEXT_SECONDARY: '#71717a',
        TEXT_MUTED: '#a1a1aa',
        BORDER: '#e5e5e5',
        INPUT: '#ffffff',
        RING: '#18181b',
        BUBBLE_USER: '#18181b',
        BUBBLE_ASSISTANT: '#f4f4f5',
        BUBBLE_TEXT_USER: '#fafafa',
        BUBBLE_TEXT_ASSISTANT: '#0a0a0a',
        INPUT_BACKGROUND: '#ffffff',
        STATUS_BAR: 'dark',
        ACCENT: '#18181b',
      },
      DARK: {
        BACKGROUND: '#000000ff',
        CARD: '#0a0a0a',
        POPOVER: '#0a0a0a',
        TEXT_PRIMARY: '#fafafa',
        TEXT_SECONDARY: '#a1a1aa',
        TEXT_MUTED: '#71717a',
        BORDER: '#171717',
        INPUT: '#0a0a0a',
        RING: '#d4d4d8',
        BUBBLE_USER: '#fafafa',
        BUBBLE_ASSISTANT: '#0a0a0a',
        BUBBLE_TEXT_USER: '#0a0a0a',
        BUBBLE_TEXT_ASSISTANT: '#fafafa',
        INPUT_BACKGROUND: '#0a0a0a',
        STATUS_BAR: 'light',
        ACCENT: '#fafafa',
      },
    },

    // Default settings
    DEFAULT_THEME: 'SYSTEM',
    DEFAULT_ACCENT: 'UNICORN_DREAMS',
    DEFAULT_LANGUAGE: 'en',
    DEFAULT_AI_PROVIDER: 'GEMINI', // Default AI provider
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

// Validation function for API keys
export const validateApiKey = (apiKey, provider = 'GEMINI') => {
  if (!apiKey) {
    return {
      isValid: false,
      message: `Please add your ${provider === 'GEMINI' ? 'Gemini' : 'OpenAI'} API key`,
    };
  }

  // Check for default placeholder keys
  if (apiKey === 'YOUR_GEMINI_API_KEY_HERE' || apiKey === 'YOUR_OPENAI_API_KEY_HERE') {
    return {
      isValid: false,
      message: `Please replace the placeholder with your actual ${provider === 'GEMINI' ? 'Gemini' : 'OpenAI'} API key`,
    };
  }

  // Provider-specific validation
  if (provider === 'GEMINI') {
    if (!apiKey.startsWith('AIza') || apiKey.length < 35) {
      return {
        isValid: false,
        message: 'Invalid Gemini API key format. Keys should start with "AIza" and be longer than 35 characters.',
      };
    }
  } else if (provider === 'OPENAI') {
    if (!apiKey.startsWith('sk-') || apiKey.length < 40) {
      return {
        isValid: false,
        message: 'Invalid OpenAI API key format. Keys should start with "sk-" and be longer than 40 characters.',
      };
    }
  }

  if (apiKey.length < 10) {
    return {
      isValid: false,
      message: 'API key appears to be too short',
    };
  }

  return {
    isValid: true,
    message: `${provider === 'GEMINI' ? 'Gemini' : 'OpenAI'} API key is configured`,
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
export const getThemeColors = (themeName, accentColor, customColor = null) => {
  const theme = CONFIG.UI.THEMES[themeName] || CONFIG.UI.THEMES[CONFIG.UI.DEFAULT_THEME];
  let accent;

  // Use custom color if accentColor is 'CUSTOM' and customColor is provided
  if (accentColor === 'CUSTOM' && customColor) {
    accent = customColor;
  } else if (accentColor === 'MONOCHROME') {
    // MONOCHROME adapts to theme: white in dark mode, black in light mode
    accent = themeName === 'DARK' ? '#ffffff' : '#000000';
  } else {
    accent = CONFIG.UI.ACCENT_COLORS[accentColor] || CONFIG.UI.ACCENT_COLORS[CONFIG.UI.DEFAULT_ACCENT];
  }

  // Create a copy of the theme and replace accent colors
  const colors = { ...theme };
  colors.BUBBLE_USER = accent;
  colors.ACCENT = accent;

  // Special handling for MONOCHROME text color to ensure proper contrast
  if (accentColor === 'MONOCHROME') {
    // Ensure proper contrast: dark text on light background, light text on dark background
    if (themeName === 'DARK') {
      // Dark mode: white background, black text
      colors.BUBBLE_TEXT_USER = '#000000';
    } else {
      // Light mode: black background, white text  
      colors.BUBBLE_TEXT_USER = '#ffffff';
    }
  } else {
    colors.BUBBLE_TEXT_USER = '#ffffff';

    // For all other accent colors, keep the original theme text colors
    // This means white text in dark mode, and the original theme colors in light mode
    // Don't override BUBBLE_TEXT_USER for non-MONOCHROME colors
  }

  // Generate gradient colors based on accent
  colors.ACCENT_LIGHT = accent + '80'; // 50% opacity

  return colors;
};

// Get available AI providers
export const getAIProviderOptions = (t) => {
  return [
    {
      key: 'GEMINI',
      name: CONFIG.AI_PROVIDERS.GEMINI.name,
      displayName: t ? t('AI_PROVIDER_GEMINI') : 'Google Gemini',
      icon: 'sparkles',
      description: t ? t('AI_PROVIDER_GEMINI_DESC') : 'Fast and cost-effective AI responses',
      setupUrl: 'https://makersuite.google.com/app/apikey',
    },
    {
      key: 'OPENAI',
      name: CONFIG.AI_PROVIDERS.OPENAI.name,
      displayName: t ? t('AI_PROVIDER_OPENAI') : 'OpenAI GPT',
      icon: 'chatbubbles',
      description: t ? t('AI_PROVIDER_OPENAI_DESC') : 'Advanced conversational AI',
      setupUrl: 'https://platform.openai.com/api-keys',
    },
  ];
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
    MONOCHROME: t ? t('COLOR_MONOCHROME') : 'Monochrome',
  };

  return Object.keys(CONFIG.UI.ACCENT_COLORS).map(key => ({
    name: key,
    color: CONFIG.UI.ACCENT_COLORS[key],
    displayName: colorNames[key] || key,
  }));
};

export default CONFIG;

// AI Service abstraction layer for multiple providers
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import { CONFIG, validateApiKey, optimizePrompt } from '../config';

class AIService {
  constructor() {
    this.currentProvider = null;
    this.aiInstance = null;
    this.apiKey = null;
  }

  // Initialize AI service with provider and API key
  async initialize(provider, apiKey) {
    try {
      // Validate the API key for the specific provider
      const validation = validateApiKey(apiKey, provider);
      if (!validation.isValid) {
        throw new Error(validation.message);
      }

      this.currentProvider = provider;
      this.apiKey = apiKey;

      if (provider === 'GEMINI') {
        this.aiInstance = new GoogleGenerativeAI(apiKey);
      } else if (provider === 'OPENAI') {
        this.aiInstance = new OpenAI({
          apiKey: apiKey,
          dangerouslyAllowBrowser: true, // Required for React Native
        });
      } else {
        throw new Error(`Unsupported AI provider: ${provider}`);
      }

      return {
        success: true,
        message: `${CONFIG.AI_PROVIDERS[provider].name} initialized successfully`,
      };
    } catch (error) {
      this.currentProvider = null;
      this.aiInstance = null;
      this.apiKey = null;
      throw error;
    }
  }

  // Check if AI service is ready
  isReady() {
    return this.currentProvider && this.aiInstance && this.apiKey;
  }

  // Get current provider info
  getCurrentProvider() {
    return this.currentProvider;
  }

  // Generate response based on current provider
  async generateResponse(message) {
    if (!this.isReady()) {
      throw new Error('AI service not initialized. Please set up your API key first.');
    }

    try {
      if (this.currentProvider === 'GEMINI') {
        return await this._generateGeminiResponse(message);
      } else if (this.currentProvider === 'OPENAI') {
        return await this._generateOpenAIResponse(message);
      } else {
        throw new Error(`Unsupported provider: ${this.currentProvider}`);
      }
    } catch (error) {
      console.error(`Error generating response from ${this.currentProvider}:`, error);
      throw error;
    }
  }

  // Private method for Gemini responses
  async _generateGeminiResponse(message) {
    const model = this.aiInstance.getGenerativeModel({
      model: CONFIG.AI_PROVIDERS.GEMINI.MODEL_NAME,
      generationConfig: {
        maxOutputTokens: CONFIG.AI_PROVIDERS.GEMINI.MAX_TOKENS,
        temperature: CONFIG.AI_PROVIDERS.GEMINI.TEMPERATURE,
      },
    });

    const optimizedPrompt = optimizePrompt(message);
    const result = await model.generateContent(optimizedPrompt);
    const response = await result.response;
    return response.text();
  }

  // Private method for OpenAI responses
  async _generateOpenAIResponse(message) {
    const optimizedPrompt = optimizePrompt(message);
    
    const completion = await this.aiInstance.chat.completions.create({
      model: CONFIG.AI_PROVIDERS.OPENAI.MODEL_NAME,
      messages: [
        {
          role: 'user',
          content: optimizedPrompt,
        },
      ],
      max_tokens: CONFIG.AI_PROVIDERS.OPENAI.MAX_TOKENS,
      temperature: CONFIG.AI_PROVIDERS.OPENAI.TEMPERATURE,
    });

    return completion.choices[0].message.content;
  }

  // Reset the service
  reset() {
    this.currentProvider = null;
    this.aiInstance = null;
    this.apiKey = null;
  }
}

// Export singleton instance
export const aiService = new AIService();
export default aiService;

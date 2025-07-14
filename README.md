# Personal Assistant - Gemini AI Chat App

A cost-effective personal assistant mobile app built with React Native and Expo, powered by Google's Gemini AI. Features a clean Google Messages-style interface for seamless cross-platform communication.

## ✨ Features

- 🤖 **Gemini AI Integration** - Powered by Google's cost-effective Gemini Flash model
- 📱 **Cross-Platform** - Runs on Android, iOS, and web
- 💬 **Google Messages UI** - Clean, familiar chat interface
- 💰 **Cost Optimized** - Designed to minimize API consumption
- ⚡ **Fast & Responsive** - Built with Expo for optimal performance
- 🎨 **Modern Design** - Beautiful gradients and smooth animations

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or later
- EAS CLI (`npm install -g @expo/eas-cli`)
- Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))
- Expo account (for EAS Build)

### Installation
1. **Clone and install**
   ```bash
   cd your-project-folder
   npm install
   ```

2. **Configure API Key**
   - Open `config.js`
   - Replace `YOUR_GEMINI_API_KEY_HERE` with your actual Gemini API key

3. **Start the app**
   ```bash
   npm start
   ```

4. **Run on device/emulator**
   ```bash
   npm run android  # Android
   npm run ios      # iOS (macOS required)
   npm run web      # Web browser
   ```

5. **Build APK for distribution (optional)**
   ```bash
   eas build --platform android --profile preview
   ```

## 📖 Detailed Setup

See [SETUP.md](./SETUP.md) for detailed setup instructions, troubleshooting, and customization options.

## 🏗 Architecture

```
├── App.js              # Main application component
├── config.js           # Configuration and settings
├── AppEnhanced.js      # Alternative enhanced version
├── SETUP.md           # Detailed setup guide
└── .github/
    └── copilot-instructions.md
```

## 💰 Cost Optimization

This app is specifically designed to minimize API costs:

- **Efficient Model**: Uses Gemini-1.5-Flash (most cost-effective)
- **Token Limits**: Responses capped at 150 tokens
- **Optimized Prompts**: Concise, targeted prompts
- **Message Limits**: User input limited to 500 characters
- **Smart Caching**: Reduces redundant API calls

## 🎨 Customization

### Change App Colors
Edit `config.js`:
```javascript
UI: {
  PRIMARY_COLOR: '#007AFF',
  SECONDARY_COLOR: '#005CBF',
  // ... customize as needed
}
```

### Adjust AI Behavior
```javascript
GEMINI: {
  MODEL_NAME: 'gemini-1.5-flash',
  MAX_TOKENS: 150,
  TEMPERATURE: 0.7,
}
```

## 📱 Platform Support

- ✅ **Android** - Full support with Expo Go or standalone APK
- ✅ **iOS** - Full support (requires macOS for development)
- ✅ **Web** - Browser-based version for development/testing

## 🛠 Development Scripts

```bash
npm start          # Start Expo development server
npm run android    # Run on Android emulator/device
npm run ios        # Run on iOS simulator/device
npm run web        # Run in web browser

# EAS Build commands
eas build --platform android --profile preview  # Build Android APK
eas build --platform ios                        # Build iOS app
eas submit --platform android                   # Submit to Google Play
eas submit --platform ios                       # Submit to App Store
```

## 📦 Building for Production

### Using EAS Build (Recommended)
```bash
# Install EAS CLI if not already installed
npm install -g @expo/eas-cli

# Build Android APK (preview build)
eas build --platform android --profile preview

# Build for iOS (requires Apple Developer account)
eas build --platform ios

# Build for both platforms
eas build --platform all
```

### EAS Build Profiles
The project uses EAS Build with preview profile for Android APK generation:
- **Preview**: Generates installable APK for testing (internal distribution)
- **Production**: For app store distribution with auto-increment versioning
- **Development**: For development builds with debugging enabled

Configuration is managed in `eas.json`. The preview build is perfect for generating APK files for testing and distribution outside of app stores.

## 🧪 Testing

- **Expo Go**: Install on your device and scan QR code
- **Android Emulator**: Android Studio required
- **iOS Simulator**: Xcode required (macOS only)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📚 [Expo Documentation](https://docs.expo.dev/)
- 🤖 [Gemini AI Documentation](https://ai.google.dev/)
- ⚛️ [React Native Documentation](https://reactnative.dev/)

## 🔮 Roadmap

- [ ] Voice input/output
- [ ] Message history persistence
- [ ] Multiple AI model options  
- [ ] Conversation export
- [ ] Enhanced glassmorphism effects
- [ ] Custom accent color picker
- [ ] Message search functionality
- [ ] Push notifications

---

Made with ❤️ using React Native, Expo, and Gemini AI

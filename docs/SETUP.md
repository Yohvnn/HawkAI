# Personal Assistant Setup Guide

## 🚀 Quick Start

### 1. Get Your Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with you- Restart both the development server and Expo Go app

**Native module linking errors**
- If you see errors about native modules not being linked
- This typically occurs when using libraries not compatible with Expo Go
- Solution: We use only Expo-compatible libraries in this project
- Run: `npx expo start --clear` to clear cache and restart

### Getting Help
- Check [Expo Documentation](https://docs.expo.dev/)
- Visit [Google AI Documentation](https://ai.google.dev/)
- Review [React Native Documentation](https://reactnative.dev/docs/getting-started)3. Click "Create API Key"
4. Copy your new API key

### 2. Configure the App
1. Open `config.js` in your project
2. Replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key:
   ```javascript
   API_KEY: 'your_actual_api_key_here',
   ```

### 3. Run the App
```bash
# Install dependencies (if not already done)
npm install

# Start the development server
npm start

# Run on Android
npm run android

# Run on iOS (requires macOS)
npm run ios

# Run in web browser
npm run web
```

### 4. Test on Your Phone (No Cable Required!) 📱
1. **Download Expo Go** on your phone from app store
2. **Run** `npm start` in your terminal 
3. **Scan the QR code** that appears in terminal with:
   - **Android**: Expo Go app → "Scan QR code"
   - **iPhone**: Camera app → Point at QR code
4. **Wait** for app to load wirelessly on your phone!

> **Note**: Make sure your phone and computer are connected to the same Wi-Fi network

## 📱 Testing

### Method 1: Expo Go (Easiest - No Cable Needed!) 🚀
1. **Install Expo Go** on your phone:
   - **Android**: Download from [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - **iPhone**: Download from [App Store](https://apps.apple.com/app/expo-go/id982107779)

2. **Connect to the same Wi-Fi**:
   - Make sure your phone and computer are on the same Wi-Fi network
   - Your computer IP shows as `192.168.1.132` in the terminal

3. **Launch the app**:
   - Run `npm start` in your terminal
   - **Android**: Open Expo Go → Tap "Scan QR code" → Scan the QR code from your terminal
   - **iPhone**: Open Camera app → Point at QR code → Tap the Expo notification that appears

4. **Your app will load wirelessly!** ✨

### Method 2: Direct Cable Connection (Alternative)
```bash
# For Android with USB debugging enabled
npm run android

# For iOS (macOS only)
npm run ios
```

### Method 3: Web Browser (For Testing)
```bash
# Run in web browser
npm run web
# Then open http://localhost:8081 in any browser
```

### Requirements for Each Method:
- **Expo Go**: Wi-Fi connection, Expo Go app installed
- **USB Connection**: USB cable, developer mode enabled on phone
- **Web Browser**: Any computer with internet browser

### Using Simulators (Advanced)
- **Android**: Requires Android Studio with emulator setup
- **iOS**: Requires macOS with Xcode installed

## 💰 Cost Optimization Features

This app is designed to minimize API costs:

- **Gemini Flash Model**: Uses the most cost-effective Gemini model
- **Token Limiting**: Responses are limited to 150 tokens
- **Optimized Prompts**: Prompts are designed to be concise
- **Message Length Limits**: User messages are capped at 500 characters

## 🎨 Customization & Themes

### Theme Support
Your app now includes:
- **Light Mode**: Clean, bright interface for daytime use
- **Dark Mode**: Easy on the eyes for low-light environments
- **8 Accent Colors**: Blue, Green, Purple, Red, Orange, Pink, Teal, Indigo

### Accessing Settings
1. Open the app
2. Tap the **settings icon** (⚙️) in the top-right header
3. Choose your preferred theme and accent color
4. Settings are automatically saved to your device

### Changing Colors Programmatically
Edit the `UI.ACCENT_COLORS` section in `config.js` to add custom colors:
```javascript
ACCENT_COLORS: {
  BLUE: '#007AFF',
  GREEN: '#34C759',
  CUSTOM: '#YOUR_HEX_COLOR', // Add your custom color here
  // ...
}
```

### Theme Configuration
Modify themes in `config.js`:
```javascript
THEMES: {
  LIGHT: {
    BACKGROUND: '#FFFFFF',
    TEXT_PRIMARY: '#000000',
    // ... customize light theme
  },
  DARK: {
    BACKGROUND: '#000000', 
    TEXT_PRIMARY: '#FFFFFF',
    // ... customize dark theme
  }
}
```

### Adjusting AI Settings
Edit the `GEMINI` section in `config.js`:
```javascript
GEMINI: {
  MODEL_NAME: 'gemini-1.5-flash', // Available: gemini-1.5-flash, gemini-1.5-pro
  MAX_TOKENS: 150,                 // Increase for longer responses (costs more)
  TEMPERATURE: 0.7,                // 0.0 = focused, 1.0 = creative
}
```

## 🛠 Troubleshooting

### Common Issues

**"Please configure your Gemini API key"**
- Make sure you've added your API key to `config.js`
- Check that the API key is valid and active

**App won't start**
- Run `npm install` to ensure all dependencies are installed
- Make sure you have Node.js 18+ installed

**Build errors**
- Clear cache: `npx expo start --clear`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

**Can't connect phone to app**
- Ensure phone and computer are on same Wi-Fi network
- Try restarting `npm start` and scanning QR code again
- Check if your firewall is blocking the connection
- Make sure Expo Go app is updated to latest version

**QR code won't scan**
- Try scanning with Expo Go app instead of camera
- Increase brightness on computer screen
- Make sure QR code is fully visible in terminal

**App loads but crashes**
- Check terminal for error messages
- Try clearing Expo cache: `npx expo start --clear`
- Restart both the development server and Expo Go app

**Reanimated version mismatch error**
- If you see "[Reanimated] Mismatch between Javascript part and native part"
- Run: `npm install react-native-reanimated@3.17.4`
- Clear cache: `npx expo start --clear`
- Restart the development server

**react-native-keyboard-controller error**
- If you see "react-native-keyboard-controller doesn't seem to be linked"
- This occurs with packages that require native linking but aren't compatible with Expo Go
- Solution: We've replaced react-native-gifted-chat with a custom Expo-compatible chat component
- Run: `npx expo start --clear` to clear cache and restart

### Getting Help
- Check [Expo Documentation](https://docs.expo.dev/)
- Visit [Google AI Documentation](https://ai.google.dev/docs)
- Review [React Native Gifted Chat docs](https://github.com/FaridSafi/react-native-gifted-chat)

## 📦 Building for Production

### Installing Java Development Kit (JDK) for Keytool

**Why you need JDK:**
- EAS Build requires `keytool` to generate Android keystores
- Without it, you'll get "500 Internal Server Error" from Expo's cloud service

**Installation Options:**

### Option 1: Download from Oracle (Recommended for Windows)
1. Visit [Oracle JDK Downloads](https://www.oracle.com/java/technologies/downloads/)
2. Download "Windows x64 Installer" for JDK 11 or newer
3. Run the installer as Administrator
4. Follow the installation wizard
5. Restart your terminal/PowerShell

### Option 2: Download Eclipse Temurin (OpenJDK)
1. Visit [Adoptium Temurin](https://adoptium.net/temurin/releases/)
2. Select "Windows" and "x64" for your platform
3. Download the ".msi" installer for JDK 11+
4. Run the installer as Administrator
5. Make sure to check "Set JAVA_HOME environment variable"
6. Restart your terminal/PowerShell

### Option 3: Using Chocolatey (Recommended - Run PowerShell as Administrator)
```bash
# Open PowerShell as Administrator, then run:
choco install openjdk11 -y

# After installation, refresh environment variables:
$env:PATH = [System.Environment]::GetEnvironmentVariable("PATH","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH","User")
```

### Option 4: Using winget (Windows Package Manager)
```bash
# In PowerShell or Command Prompt:
winget install EclipseAdoptium.Temurin.11.JDK
```

### Verify Installation
After installing, restart your terminal and check:
```bash
java -version
keytool -help
```

You should see version information for both commands.

### Android APK Build Process

**Method 1: EAS Build (With Local Keytool)**
```bash
# Now that you have keytool installed:
eas build --platform android
```

**Method 2: Expo Build Classic (Alternative)**
```bash
npx expo build:android
```

### iOS IPA (requires Apple Developer account)
```bash
npx expo build:ios
```

### Using EAS Build for Both Platforms
```bash
# Install EAS CLI
npm install -g eas-cli

# Configure your project
eas configure

# Build for all platforms
eas build --platform all
```

### Troubleshooting Build Issues

**500 Internal Server Error when generating keystore**
- Install JDK locally (see instructions above)
- Restart your terminal after JDK installation
- Try the build command again

**"keytool not found" error**
- Make sure JDK is properly installed
- Restart your terminal/PowerShell
- Check that `keytool -help` works
- If still not working, add Java bin directory to your PATH

**Build takes too long or fails**
- Check [Expo Status Page](https://status.expo.dev/) for service issues
- Try building during off-peak hours
- Use `eas build --platform android --clear-cache` to clear cache

**Alternative: Local APK Generation**
If cloud builds continue to fail:
```bash
# Generate development build
npx expo prebuild
npx expo run:android

# This creates a debug APK in:
# android/app/build/outputs/apk/debug/app-debug.apk
```


## 📦 After Building Successfully

### Understanding Your Build Output

**Android App Bundle (.aab)**
- Modern format for Google Play Store distribution
- Optimized for different device configurations
- Cannot be installed directly on devices

**APK (Android Package)**
- Traditional format for direct installation
- Can be installed on any Android device
- Good for testing and private distribution

### What to Do Next

**For Testing/Private Use:**
```bash
# Get APK version for direct installation
eas build --platform android --profile preview

# Or use the classic build for APK
npx expo build:android
```

**For Google Play Store:**
1. Create [Google Play Console](https://play.google.com/console/) account ($25)
2. Upload your .aab file
3. Complete app listing (description, screenshots, etc.)
4. Submit for review

**For Direct Installation:**
```bash
# Download APK from build URL
# Enable "Unknown Sources" on Android device
# Install APK directly
```

### Converting .aab to .apk (Working Method)
If you need to convert your .aab to installable .apk:

```bash
# Download your .aab file from Expo build URL
curl -L -o oscar.aab https://expo.dev/artifacts/eas/YOUR_BUILD_URL.aab

# Download official Google bundletool
curl -L -o bundletool.jar https://github.com/google/bundletool/releases/download/1.15.6/bundletool-all-1.15.6.jar

# Convert .aab to universal APK
java -jar bundletool.jar build-apks --bundle=oscar.aab --output=oscar_v1.apks --mode=universal

# Extract the APK file
copy oscar_v1.apks oscar_v1.zip
powershell "Expand-Archive -Path oscar_v1.zip -DestinationPath extracted_apks -Force"
copy "extracted_apks\universal.apk" "Oscar_PersonalAssistant_v1.apk"
```

**Note**: The npm bundletool package doesn't work properly. Use the official Google bundletool JAR file instead.

Enjoy your personal assistant! 🤖✨
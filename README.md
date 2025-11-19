# Classic Games

A collection of classic games built with Expo-go and React Native, supporting iOS, Android.

## 🎮 Games

### 1. Rock Paper Scissors
- Support for single and multi-round battle modes
- Real-time win/loss result display
- Track player and computer win counts
- Multi-language support (Traditional Chinese, English)

### 2. Bingo 🎰
- Slot machine-style spinning game
- Three reels spinning simultaneously
- Support for jackpot, small win, and no-win result displays
- "Guaranteed Win" mode for testing purposes

### 3. Sic Bo 🎲
- Classic dice big/small game
- Countdown betting system
- Support for multiple chip denominations (5, 10, 25, 100)
- Real-time game result and payout calculation display
- Wallet balance management

## ✨ Features

- 🎯 **Multi-platform Support**: iOS and Android
- 🌐 **Internationalization**: Multi-language support using i18next
- 🎨 **Modern UI**: Beautiful user interface design
- 📱 **Responsive Design**: Adapts to various screen sizes
- 🎭 **Animations**: Smooth animations and transitions
- 🎪 **Theme System**: Support for dark/light themes
- 🎲 **Interactive Experience**: Haptic feedback and visual effects

## 🛠️ Tech Stack

- **Framework**: React Native 0.79.6
- **Development Platform**: Expo ~53.0.22
- **Routing**: Expo Router ~5.1.5 (file-based routing)
- **Language**: TypeScript
- **Internationalization**: i18next, react-i18next
- **Animations**: react-native-reanimated
- **UI Components**: @gorhom/bottom-sheet, @expo/vector-icons
- **State Management**: React Hooks

## 📦 Installation & Setup

### Prerequisites

- Node.js (LTS version recommended)
- npm or pnpm (project uses pnpm as package manager)

### Installation Steps

1. Install dependencies

   ```bash
   npm install
   # or using pnpm
   pnpm install
   ```

2. Start the development server

   ```bash
   npm start
   # or
   npx expo start
   ```

3. Choose your platform

   In the terminal output, you can choose to open the app in:

   - **Development build**: [development build](https://docs.expo.dev/develop/development-builds/introduction/)
   - **Android emulator**: [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
   - **iOS simulator**: [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
   - **Expo Go**: [Expo Go](https://expo.dev/go) (limited sandbox for quick testing)

### Other Available Commands

```bash
# Android
npm run android

# iOS
npm run ios

# Lint check
npm run lint

# Generate i18n files
npm run i18n:generate
```

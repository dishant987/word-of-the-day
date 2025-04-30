# Word of the Day

A beautiful and engaging React Native application that helps users expand their vocabulary by learning new words daily. Built with Expo and React Native.

![Word of the Day App](https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## Features

- 📚 Daily curated words with definitions and example usage
- 🎯 Track your learning progress
- 📱 Responsive design that works on both mobile and web
- 💾 Persistent storage of learned words
- 🔄 Real-time history updates
- 🎨 Beautiful, animated user interface

## Tech Stack

- [Expo](https://expo.dev/) - React Native development framework
- [Expo Router](https://docs.expo.dev/router/introduction/) - File-based routing
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) - Smooth animations
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) - Persistent data storage
- [Lucide Icons](https://lucide.dev/) - Beautiful, consistent icons

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or newer)
- [npm](https://www.npmjs.com/) (v8 or newer)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/word-of-the-day.git
```

2. Navigate to the project directory:
```bash
cd word-of-the-day
```

3. Install dependencies:
```bash
npm install
```

## Running the App

### Development

Start the development server:

```bash
npm run dev
```

This will start the Expo development server and provide you with options to:
- Run on iOS simulator (macOS only)
- Run on Android emulator
- Open in web browser
- View on your device using Expo Go

### Building for Production

To create a production build for web:

```bash
npm run build:web
```

## Project Structure

```
word-of-the-day/
├── app/                    # Application routes
│   ├── (tabs)/            # Tab-based navigation
│   │   ├── _layout.tsx    # Tab navigation configuration
│   │   ├── index.tsx      # Home screen
│   │   ├── word.tsx       # Word of the day screen
│   │   └── history.tsx    # Word history screen
│   └── _layout.tsx        # Root layout configuration
├── components/            # Reusable components
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
└── utils/               # Utility functions
```

## Features in Detail

### Home Screen
- Beautiful carousel showcasing app features
- Quick access to start learning
- Progress tracking
- Recent words preview

### Word of the Day Screen
- Clear word presentation
- Definition and example usage
- Easy navigation to next word
- Pull-to-refresh functionality

### History Screen
- Chronological list of learned words
- Date tracking for each word
- Clear history option
- Pull-to-refresh for updates
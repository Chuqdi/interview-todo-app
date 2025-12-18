# Todo App

A React Native todo application built with Expo, Redux, and TypeScript. Features include task management, voice input, search functionality, and persistent storage.

## Features

- ✅ Create, edit, and delete tasks
- 🎤 Voice input for quick task creation
- 🔍 Search and filter tasks
- 📅 Due date management
- 💾 Persistent local storage
- 🎨 Custom theming support
- ✨ Smooth animations and transitions

## Tech Stack

- **React Native** - Mobile framework
- **Expo** - Development platform
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Navigation** - Navigation
- **AsyncStorage** - Local data persistence
- **Jest & React Native Testing Library** - Testing
- **Expo Speech Recognition** - Voice input

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (optional, but recommended)
- [Expo Go app](https://expo.dev/client) on your mobile device (for testing on physical device)

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```

2. **Install dependencies**

```bash
npm install
```

or if you're using yarn:

```bash
yarn install
```

## Running the App

### Start the development server

```bash
npm start
```

or

```bash
npx expo start
```

This will open the Expo Developer Tools in your browser.

### Run on specific platforms

**iOS Simulator** (macOS only):

```bash
npm run ios
```

**Android Emulator**:

```bash
npm run android
```

**Web Browser**:

```bash
npm run web
```

### Run on physical device

1. Install the [Expo Go](https://expo.dev/client) app on your iOS or Android device
2. Make sure your device is on the same WiFi network as your computer
3. Scan the QR code shown in the terminal or Expo Developer Tools

## Running Tests

### Run all tests

```bash
npm test
```

### Run tests in watch mode

```bash
npm run test:watch
```

### Run tests with coverage

```bash
npm run test:coverage
```

### Run specific test file

```bash
npm test -- src/hooks/useDebounce.test.js
```

### Clear Jest cache (if tests are failing unexpectedly)

```bash
npx jest --clearCache
npm test
```

## Project Structure

```
todo-app/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── ui/          # Basic UI components (Button, Input, etc.)
│   │   ├── TaskItem.tsx
│   │   ├── EmptyState.tsx
│   │   └── ...
│   ├── screens/         # Screen components
│   │   ├── TaskListScreen.tsx
│   │   └── AddTaskScreen.tsx
│   ├── store/           # Redux store and slices
│   │   ├── index.ts
│   │   ├── tasksSlice.ts
│   │   └── hooks.ts
│   ├── hooks/           # Custom React hooks
│   │   ├── useDebounce.ts
│   │   └── useStyles.ts
│   ├── context/         # React Context providers
│   │   └── ThemeContextProvider.tsx
│   ├── utils/           # Utility functions
│   │   └── taskParser.ts
│   └── types/           # TypeScript type definitions
│       └── index.ts
├── __tests__/           # Test files
├── App.tsx              # Root component
├── package.json
├── tsconfig.json
├── jest.config.js       # Jest configuration
└── babel.config.js      # Babel configuration
```

## Testing Structure

Tests are organized alongside their source files:

```
src/
├── components/
│   └── ui/
│       ├── Input.tsx
│       └── Input.test.js
├── hooks/
│   ├── useDebounce.ts
│   └── useDebounce.test.js
└── screens/
    ├── TaskListScreen.tsx
    └── TaskListScreen.test.js
```

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run in web browser
- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## Troubleshooting

### Jest/Testing Issues

**Problem: Tests failing with "Unexpected token 'export'"**

Solution: Clear Jest cache and reinstall dependencies

```bash
npx jest --clearCache
rm -rf node_modules
npm install
```

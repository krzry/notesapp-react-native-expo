# How to Build a Simple Notes App with React Native and Expo

This guide walks through the steps to create a simple notes application using React Native, Expo, and TypeScript. The app includes features like creating, editing, searching, and deleting notes with local storage.

## Prerequisites
- Node.js (v16 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Basic knowledge of JavaScript/TypeScript and React

## Step 1: Set Up the Project
1. Create a new Expo project:
   ```bash
   npx create-expo-app notesapp --template
   ```
2. Choose the "blank (TypeScript)" template
3. Navigate to the project directory:
   ```bash
   cd notesapp
   ```

## Step 2: Install Dependencies
Install required packages:
```bash
npm install @react-native-async-storage/async-storage @react-navigation/native expo-router
```

## Step 3: Create the Note Type
Create `types/Note.ts` to define the note structure:
```typescript
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## Step 4: Create the Notes Context
Create `context/NotesContext.tsx` to manage the notes state and provide CRUD operations using React Context.

## Step 5: Build the Main Screen
Create `app/(tabs)/index.tsx` with:
- A search bar
- List of notes
- Add note button
- SafeAreaView for iOS notch support

## Step 6: Create the Note Editor
Create `app/note/[id].tsx` with:
- Title and content inputs
- Save and cancel buttons
- Delete option for existing notes
- SafeAreaView for iOS notch support

## Step 7: Set Up Navigation
Update `app/_layout.tsx` to:
- Wrap the app in NotesProvider
- Set up stack navigation
- Configure initial route

## Step 8: Run the App
Start the development server:
```bash
npx expo start
```

Scan the QR code with the Expo Go app on your iOS/Android device or use an emulator.

## Key Features Implemented
- Local storage with AsyncStorage
- Context API for state management
- TypeScript for type safety
- Expo Router for navigation
- Responsive design with SafeAreaView

## Next Steps
- Add authentication
- Sync with cloud storage
- Add rich text editing
- Implement categories/tags

Happy coding! 
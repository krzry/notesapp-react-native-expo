# Notes App File Explanations

This document explains the purpose and functionality of each key file in the simple notes application.

## 1. `types/Note.ts`
- **Purpose**: Defines the structure of a note
- **Key Features**:
  - `id`: Unique identifier for each note
  - `title`: The note's title
  - `content`: The note's text content
  - `createdAt`: When the note was created
  - `updatedAt`: When the note was last modified
- **Why It's Important**: Ensures all notes follow the same structure throughout the app

## 2. `context/NotesContext.tsx`
- **Purpose**: Manages the global state of notes
- **Key Features**:
  - Stores all notes in state
  - Provides functions for CRUD operations (Create, Read, Update, Delete)
  - Uses AsyncStorage to persist notes between app launches
  - Makes the notes available to all components via Context API
- **Why It's Important**: Centralizes note management and makes data available app-wide

## 3. `app/(tabs)/index.tsx`
- **Purpose**: Main screen that displays all notes
- **Key Features**:
  - Shows a list of all notes
  - Includes a search bar to filter notes
  - Has a "+" button to create new notes
  - Uses SafeAreaView to handle device notches
  - Each note is clickable to edit
- **Why It's Important**: The primary interface for viewing and accessing notes

## 4. `app/note/[id].tsx`
- **Purpose**: Screen for editing existing notes or creating new ones
- **Key Features**:
  - Editable title and content fields
  - Save and Cancel buttons
  - Delete button for existing notes
  - Uses SafeAreaView for proper display
  - Handles both creating and updating notes
- **Why It's Important**: Where users actually write and modify their notes

## 5. `app/_layout.tsx`
- **Purpose**: Sets up the app's navigation structure
- **Key Features**:
  - Wraps the app in NotesProvider to provide context
  - Configures stack navigation
  - Defines initial route
  - Handles theming (light/dark mode)
- **Why It's Important**: Manages how users move between screens

## 6. `package.json`
- **Purpose**: Lists all project dependencies and scripts
- **Key Features**:
  - Contains all required libraries
  - Defines project scripts (start, build, etc.)
  - Specifies project metadata
- **Why It's Important**: Ensures everyone working on the project uses the same versions

## How Files Work Together
1. `_layout.tsx` sets up the navigation and provides the NotesContext
2. The main screen (`index.tsx`) displays notes from the context
3. When a user creates/edits a note, `[id].tsx` uses context functions to update state
4. The context (`NotesContext.tsx`) saves changes to AsyncStorage
5. The Note type (`Note.ts`) ensures all notes have consistent structure

This structure makes the app:
- Easy to maintain (logic is separated)
- Scalable (can add more features)
- Reliable (type-safe and well-organized) 
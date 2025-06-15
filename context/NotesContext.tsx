import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Note } from '../types/Note';

interface NotesContextType {
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, note: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  searchNotes: (query: string) => Note[];
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const saveNotes = async (newNotes: Note[]) => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  const addNote = (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newNote: Note = {
      ...note,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const updateNote = (id: string, note: Partial<Note>) => {
    const updatedNotes = notes.map((n) =>
      n.id === id ? { ...n, ...note, updatedAt: new Date() } : n
    );
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const searchNotes = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(lowercaseQuery) ||
        note.content.toLowerCase().includes(lowercaseQuery)
    );
  };

  return (
    <NotesContext.Provider
      value={{ notes, addNote, updateNote, deleteNote, searchNotes }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
}; 
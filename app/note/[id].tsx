import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNotes } from '../../context/NotesContext';

export default function NoteEditorScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { notes, addNote, updateNote, deleteNote } = useNotes();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const isNewNote = id === 'new';
  const note = notes.find((n) => n.id === id);

  useEffect(() => {
    if (!isNewNote && note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [isNewNote, note]);

  const handleSave = () => {
    if (isNewNote) {
      addNote({ title, content });
    } else if (note) {
      updateNote(note.id, { title, content });
    }
    router.back();
  };

  const handleDelete = () => {
    if (!isNewNote && note) {
      deleteNote(note.id);
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.button}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave} style={[styles.button, styles.saveButton]}>
            <Text style={[styles.buttonText, styles.saveButtonText]}>Save</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.titleInput}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.contentInput}
          placeholder="Start writing..."
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
          placeholderTextColor="#999"
        />
        {!isNewNote && (
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete Note</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  button: {
    padding: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  saveButtonText: {
    color: '#fff',
  },
  titleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  contentInput: {
    flex: 1,
    fontSize: 16,
    padding: 16,
    lineHeight: 24,
  },
  deleteButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 
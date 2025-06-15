import { Link } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNotes } from '../../context/NotesContext';
import { Note } from '../../types/Note';

export default function NotesScreen() {
  const { notes, searchNotes } = useNotes();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = searchQuery ? searchNotes(searchQuery) : notes;

  const renderNoteItem = ({ item }: { item: Note }) => (
    <Link href={`/note/${item.id}`} asChild>
      <TouchableOpacity style={styles.noteItem}>
        <Text style={styles.noteTitle}>{item.title}</Text>
        <Text style={styles.notePreview} numberOfLines={2}>
          {item.content}
        </Text>
        <Text style={styles.noteDate}>
          {new Date(item.updatedAt).toLocaleDateString()}
        </Text>
      </TouchableOpacity>
    </Link>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search notes..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Link href="/note/new" asChild>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <FlatList
          data={filteredNotes}
          renderItem={renderNoteItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.notesList}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  addButton: {
    width: 40,
    height: 40,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  notesList: {
    padding: 16,
  },
  noteItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  notePreview: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  noteDate: {
    fontSize: 12,
    color: '#999',
  },
});

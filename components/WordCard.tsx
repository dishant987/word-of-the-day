import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Word } from '../types/word';

interface WordCardProps {
  word: Word;
  showDate?: boolean;
  isHighlighted?: boolean;
}

export function WordCard({ word, showDate = false, isHighlighted = false }: WordCardProps) {
  // Format the date string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <View style={[
      styles.card,
      isHighlighted && styles.highlightedCard,
      Platform.OS === 'web' && styles.webShadow
    ]}>
      <View style={styles.header}>
        <Text style={styles.wordText}>{word.word}</Text>
        {showDate && (
          <Text style={styles.dateText}>{formatDate(word.addedAt)}</Text>
        )}
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Definition</Text>
          <Text style={styles.definitionText}>{word.definition}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Example</Text>
          <Text style={styles.exampleText}>{word.example}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  webShadow: {
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  highlightedCard: {
    borderColor: '#3B5B92',
    borderWidth: 2,
    backgroundColor: '#FFFDF6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  wordText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3B5B92',
    textTransform: 'capitalize',
  },
  dateText: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 12,
  },
  content: {
    gap: 16,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  definitionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  exampleText: {
    fontSize: 16,
    color: '#555',
    fontStyle: 'italic',
    lineHeight: 24,
  },
});
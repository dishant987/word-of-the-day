import { useState, useEffect, useCallback } from 'react';
import { fetchRandomWord } from '../utils/api';
import { saveWord, getWords, clearWords } from '../utils/storage';
import { Word } from '../types/word';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

export function useWordOfTheDay() {
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [history, setHistory] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial word and history
  useEffect(() => {
    loadWordAndHistory();
  }, []);

  const loadWordAndHistory = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Get all saved words
      const savedWords = await getWords();
      setHistory(savedWords);
      
      // If we have a saved word, use it as current
      if (savedWords.length > 0) {
        setCurrentWord(savedWords[0]);
      } else {
        // Otherwise, fetch a new word
        await fetchAndSaveNewWord();
      }
    } catch (e) {
      setError('Failed to load word of the day');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAndSaveNewWord = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Fetch new word from API
      const apiWord = await fetchRandomWord();
      
      if (!apiWord) {
        throw new Error('Failed to fetch a new word');
      }
      
      // Create word object from API response
      const word: Word = {
        id: Date.now().toString(),
        word: apiWord.word,
        definition: apiWord.results[0].definition,
        example: apiWord.results[0].examples?.[0] || 'No example available',
        addedAt: new Date().toISOString(),
      };
      
      // Save word to storage
      await saveWord(word);
      
      // Update state
      setCurrentWord(word);
      setHistory(prev => [word, ...prev]);
      
      // Trigger haptic feedback on non-web platforms
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      
      return word;
    } catch (e) {
      setError('Failed to fetch a new word');
      console.error(e);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const clearAllWords = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Clear all words from storage
      await clearWords();
      
      // Reset state
      setHistory([]);
      setCurrentWord(null);
      
      // Fetch a new word
      await fetchAndSaveNewWord();
      
      // Trigger haptic feedback on non-web platforms
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (e) {
      setError('Failed to clear history');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    currentWord,
    history,
    isLoading,
    error,
    fetchNewWord: fetchAndSaveNewWord,
    clearHistory: clearAllWords,
    refreshAll: loadWordAndHistory
  };
}
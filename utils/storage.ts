import AsyncStorage from '@react-native-async-storage/async-storage';
import { Word } from '../types/word';

const WORDS_STORAGE_KEY = 'word_of_the_day_history';

/**
 * Save a word to AsyncStorage
 */
export const saveWord = async (word: Word): Promise<void> => {
  try {
    // Get existing words
    const existingWords = await getWords();
    
    // Check if word with same ID already exists
    const wordExists = existingWords.some(w => w.id === word.id);
    
    // If word doesn't exist, add it to the array
    if (!wordExists) {
      const updatedWords = [word, ...existingWords];
      await AsyncStorage.setItem(WORDS_STORAGE_KEY, JSON.stringify(updatedWords));
    }
  } catch (error) {
    console.error('Error saving word:', error);
  }
};

/**
 * Get all words from AsyncStorage
 */
export const getWords = async (): Promise<Word[]> => {
  try {
    const words = await AsyncStorage.getItem(WORDS_STORAGE_KEY);
    return words ? JSON.parse(words) : [];
  } catch (error) {
    console.error('Error getting words:', error);
    return [];
  }
};

/**
 * Clear all words from AsyncStorage
 */
export const clearWords = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(WORDS_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing words:', error);
  }
};

/**
 * Get the current word of the day
 */
export const getCurrentWord = async (): Promise<Word | null> => {
  try {
    const words = await getWords();
    return words.length > 0 ? words[0] : null;
  } catch (error) {
    console.error('Error getting current word:', error);
    return null;
  }
};
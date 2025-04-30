import React, { useCallback } from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WordCard } from '@/components/WordCard';
import { Button } from '@/components/Button';
import { useWordOfTheDay } from '@/hooks/useWordOfTheDay';
import { EmptyState } from '@/components/EmptyState';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export default function WordScreen() {
  const { currentWord, isLoading, error, fetchNewWord, refreshAll } = useWordOfTheDay();

  const handleRefresh = useCallback(async () => {
    await refreshAll();
  }, [refreshAll]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View 
        style={styles.content}
      >
        {error ? (
          <View style={styles.errorContainer}>
            <EmptyState
              title="Error Loading Word"
              message={error}
            />
            <Button 
              title="Try Again" 
              onPress={refreshAll} 
              variant="secondary"
              style={styles.retryButton}
            />
          </View>
        ) : !currentWord ? (
          <View style={styles.emptyContainer}>
            <EmptyState
              title="No Word Found"
              message="Tap the button below to get your first word of the day!"
            />
            <Button
              title="Get Word"
              onPress={fetchNewWord}
              isLoading={isLoading}
              style={styles.getWordButton}
            />
          </View>
        ) : (
          <Animated.ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
            }
          >
            <Animated.View
              entering={FadeIn.duration(500)}
              exiting={FadeOut.duration(300)}
              style={styles.cardContainer}
            >
              <WordCard word={currentWord} isHighlighted={true} />
            </Animated.View>

            <View style={styles.actionsContainer}>
              <Button
                title="New Word"
                icon="refresh-cw"
                onPress={fetchNewWord}
                isLoading={isLoading}
                style={styles.button}
              />
            </View>
          </Animated.ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF6',
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  cardContainer: {
    flex: 1,
    marginVertical: 16,
  },
  actionsContainer: {
    padding: 16,
    alignItems: 'center',
  },
  button: {
    minWidth: 140,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  retryButton: {
    marginTop: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  getWordButton: {
    marginTop: 16,
  },
});
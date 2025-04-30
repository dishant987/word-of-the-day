import React, { useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, Platform, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WordCard } from '@/components/WordCard';
import { Button } from '@/components/Button';
import { useWordOfTheDay } from '@/hooks/useWordOfTheDay';
import { EmptyState } from '@/components/EmptyState';
import { Word } from '@/types/word';

export default function HistoryScreen() {
  const { history, isLoading, clearHistory, refreshAll } = useWordOfTheDay();

  const handleClearHistory = () => {
    if (Platform.OS === 'web') {
      // On web, we just show a simple confirm dialog
      if (confirm('Are you sure you want to clear your word history?')) {
        clearHistory();
      }
    } else {
      // On native, we use the Alert API
      Alert.alert(
        'Clear History',
        'Are you sure you want to clear your word history?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Clear',
            onPress: () => clearHistory(),
            style: 'destructive',
          },
        ],
        { cancelable: true }
      );
    }
  };

  const renderWordItem = ({ item }: { item: Word }) => (
    <WordCard word={item} showDate={true} />
  );

  const handleRefresh = useCallback(async () => {
    await refreshAll();
  }, [refreshAll]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.header}>
        <Text style={styles.title}>Word History</Text>
        {history.length > 0 && (
          <Text style={styles.subtitle}>
            You've learned {history.length} new word{history.length !== 1 ? 's' : ''}
          </Text>
        )}
      </View>

      {history.length > 0 ? (
        <>
          <FlatList
            data={history}
            renderItem={renderWordItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
            }
          />
          <View style={styles.footer}>
            <Button
              title="Clear History"
              variant="danger"
              onPress={handleClearHistory}
              icon="trash-2"
              isLoading={isLoading}
            />
          </View>
        </>
      ) : (
        <EmptyState
          title="No Words in History"
          message="Words you've viewed will appear here. Try fetching a new word from the Today tab."
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF6',
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#3B5B92',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  listContent: {
    paddingBottom: 80,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(255, 253, 246, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
    alignItems: 'center',
  },
});
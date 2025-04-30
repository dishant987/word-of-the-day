import React, { useCallback, useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Dimensions,
  Image,
  Pressable,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WordCard } from '@/components/WordCard';
import { Button } from '@/components/Button';
import { useWordOfTheDay } from '@/hooks/useWordOfTheDay';
import { EmptyState } from '@/components/EmptyState';
import { useRouter } from 'expo-router';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import {
  Book,
  ChevronRight,
  Sparkles,
  Brain,
  History,
} from 'lucide-react-native';

const CAROUSEL_DATA = [
  {
    id: '1',
    image:
      'https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Expand Your Mind',
    description: 'Discover new words and their meanings daily',
  },
  {
    id: '2',
    image:
      'https://images.pexels.com/photos/3243090/pexels-photo-3243090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Track Progress',
    description: 'Build your vocabulary systematically',
  },
  {
    id: '3',
    image:
      'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Learn Daily',
    description: 'Create a consistent learning habit',
  },
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CAROUSEL_ITEM_WIDTH = Math.min(SCREEN_WIDTH, 600) - 32; // Subtract margin

const FEATURES = [
  {
    id: '1',
    icon: Brain,
    title: 'Smart Learning',
    description: 'Curated words to enhance your vocabulary effectively',
  },
  {
    id: '2',
    icon: History,
    title: 'Track History',
    description: 'Review previously learned words anytime',
  },
  {
    id: '3',
    icon: Sparkles,
    title: 'Daily Updates',
    description: 'Fresh words every day to keep you motivated',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { currentWord, isLoading, error, fetchNewWord, refreshAll, history } =
    useWordOfTheDay();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const scale = useSharedValue(1);
  const carouselTimer = useRef<NodeJS.Timeout>();
  const fadeAnim = useSharedValue(0);

  useEffect(() => {
    fadeAnim.value = withSequence(withDelay(300, withSpring(1)), withSpring(1));

    // Auto-scroll carousel
    carouselTimer.current = setInterval(() => {
      const nextIndex = (activeIndex + 1) % CAROUSEL_DATA.length;
      scrollRef.current?.scrollTo({
        x: nextIndex * CAROUSEL_ITEM_WIDTH,
        animated: true,
      });
      setActiveIndex(nextIndex);
    }, 5000);

    return () => {
      if (carouselTimer.current) {
        clearInterval(carouselTimer.current);
      }
    };
  }, [activeIndex]);

  const handleRefresh = useCallback(async () => {
    await refreshAll();
  }, [refreshAll]);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / CAROUSEL_ITEM_WIDTH);
    setActiveIndex(index);
  };

  const handleStartLearning = async () => {
    if (!currentWord) {
      await fetchNewWord();
    }
    router.push('/(tabs)/word');
  };

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: fadeAnim.value,
  }));

  const renderCarouselItem = ({
    id,
    image,
    title,
    description,
  }: (typeof CAROUSEL_DATA)[0]) => (
    <Animated.View
      key={id}
      style={[styles.carouselItem, { width: CAROUSEL_ITEM_WIDTH }]}
      entering={FadeIn.duration(500)}
    >
      <Image source={{ uri: image }} style={styles.carouselImage} />
      <View style={styles.carouselGradient} />
      <View style={styles.carouselContent}>
        <Text style={styles.carouselTitle}>{title}</Text>
        <Text style={styles.carouselDescription}>{description}</Text>
      </View>
    </Animated.View>
  );

  const renderFeatureCard = ({
    id,
    icon: Icon,
    title,
    description,
  }: (typeof FEATURES)[0]) => (
    <Animated.View
      key={id}
      style={styles.featureCard}
      entering={FadeIn.delay(parseInt(id) * 200)}
    >
      <Icon size={32} color="#3B5B92" />
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { alignItems: SCREEN_WIDTH > 768 ? 'center' : 'stretch' },
        ]}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
      >
        <View style={[styles.header, SCREEN_WIDTH > 768 && styles.wideHeader]}>
          <Text style={styles.title}>Word of the Day</Text>
          <Text style={styles.subtitle}>
            Expand your vocabulary one word at a time
          </Text>
          {history.length > 0 && (
            <Text style={styles.progressText}>
              You've learned {history.length} word
              {history.length !== 1 ? 's' : ''} so far!
            </Text>
          )}
        </View>

        <Animated.View style={[styles.content, animatedStyle]}>
          <View style={styles.carouselContainer}>
            <ScrollView
              ref={scrollRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              style={styles.carousel}
              decelerationRate="fast"
            >
              {CAROUSEL_DATA.map(renderCarouselItem)}
            </ScrollView>

            <View style={styles.indicatorContainer}>
              {CAROUSEL_DATA.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicator,
                    index === activeIndex && styles.activeIndicator,
                  ]}
                />
              ))}
            </View>
          </View>

          <Animated.View style={[styles.getStartedContainer, animatedStyle]}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleStartLearning}
              style={styles.getStartedButton}
            >
              <View style={styles.getStartedContent}>
                <Book size={24} color="#fff" style={styles.getStartedIcon} />
                <Text style={styles.getStartedText}>
                  {currentWord ? 'Continue Learning' : 'Start Learning'}
                </Text>
                <ChevronRight size={24} color="#fff" />
              </View>
            </Pressable>
          </Animated.View>

          <View
            style={[
              styles.featuresContainer,
              SCREEN_WIDTH > 768 && styles.wideFeaturesContainer,
            ]}
          >
            {FEATURES.map(renderFeatureCard)}
          </View>

          {history.length > 0 ? (
            <View style={styles.recentWordsContainer}>
              <Text style={styles.recentWordsTitle}>Recent Words</Text>
              {history.slice(0, 3).map((word) => (
                <Animated.View
                  key={word.id}
                  entering={FadeIn.duration(500)}
                  style={styles.recentWordCard}
                >
                  <WordCard word={word} showDate={true} />
                </Animated.View>
              ))}
              {history.length > 3 && (
                <Button
                  title="View All Words"
                  variant="secondary"
                  icon="list"
                  onPress={() => router.push('/(tabs)/history')}
                  style={styles.viewAllButton}
                />
              )}
            </View>
          ) : (
            <EmptyState
              title="No words yet"
              message="You haven't learned any words yet. Start by clicking the button below."
              key={'empty-state'}
            />
          )}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF6',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  content: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    alignItems: 'center',
  },
  wideHeader: {
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#3B5B92',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  progressText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#3B5B92',
    marginTop: 8,
    textAlign: 'center',
  },
  carouselContainer: {
    marginBottom: 24,
  },
  carousel: {
    height: 400,
  },
  carouselItem: {
    height: 400,
    position: 'relative',
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 16,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
      },
    }),
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  carouselGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  carouselContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 32,
  },
  carouselTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#fff',
    marginBottom: 8,
  },
  carouselDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#3B5B92',
    width: 24,
  },
  getStartedContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: 'center',
  },
  getStartedButton: {
    backgroundColor: '#3B5B92',
    borderRadius: 16,
    padding: 20,
    maxWidth: 400,
    width: '100%',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 12px rgba(59, 91, 146, 0.2)',
      },
      default: {
        shadowColor: '#3B5B92',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 5,
      },
    }),
  },
  getStartedContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  getStartedIcon: {
    marginRight: 12,
  },
  getStartedText: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#fff',
    marginRight: 12,
  },
  featuresContainer: {
    padding: 24,
    gap: 16,
  },
  wideFeaturesContainer: {
    flexDirection: 'row',
    maxWidth: 1200,
    alignSelf: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  featureCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    minWidth: SCREEN_WIDTH > 768 ? 300 : '100%',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 2,
      },
    }),
  },
  featureTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  recentWordsContainer: {
    padding: 24,
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
  },
  recentWordsTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#3B5B92',
    marginBottom: 16,
    textAlign: 'center',
  },
  recentWordCard: {
    marginBottom: 16,
  },
  viewAllButton: {
    marginTop: 16,
    alignSelf: 'center',
  },
});

import { ApiWord } from '../types/word';

/**
 * List of common words to use for fetching random words
 */
const commonWords = [
  'serendipity', 'ephemeral', 'mellifluous', 'luminescence', 'eloquent',
  'resplendent', 'solitude', 'quintessential', 'magnificent', 'breathtaking',
  'euphoria', 'melancholy', 'nostalgia', 'tranquility', 'perseverance',
  'exquisite', 'ethereal', 'resonance', 'incandescent', 'jubilant',
  'dazzling', 'alluring', 'boundless', 'captivating', 'illustrious',
  'immaculate', 'intricate', 'jubilation', 'labyrinth', 'mesmerize',
  'opulent', 'patience', 'quixotic', 'radiance', 'spectacular',
  'whimsical', 'zenith', 'vivacious', 'transcendent', 'harmony'
];

/**
 * Fetch a random word and its definition
 */
export const fetchRandomWord = async (): Promise<ApiWord | null> => {
  try {
    // Select a random word from our curated list
    const randomIndex = Math.floor(Math.random() * commonWords.length);
    const randomWord = commonWords[randomIndex];
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      word: randomWord,
      results: [
        {
          definition: simulateDefinition(randomWord),
          examples: [simulateExample(randomWord)],
          partOfSpeech: 'noun'
        }
      ]
    };
  } catch (error) {
    console.error('Error fetching random word:', error);
    return null;
  }
};

/**
 * Simulate a definition for our demo
 */
const simulateDefinition = (word: string): string => {
  const definitions: Record<string, string> = {
    'serendipity': 'The occurrence and development of events by chance in a happy or beneficial way.',
    'ephemeral': 'Lasting for a very short time.',
    'mellifluous': 'Sweet or musical; pleasant to hear.',
    'luminescence': 'The emission of light by a substance that has not been heated.',
    'eloquent': 'Fluent or persuasive in speaking or writing.',
    'resplendent': 'Attractive and impressive through being richly colorful or sumptuous.',
    'solitude': 'The state or situation of being alone.',
    'quintessential': 'Representing the most perfect or typical example of a quality or class.',
    'magnificent': 'Extremely beautiful, elaborate, or impressive.',
    'breathtaking': 'Astonishing or awe-inspiring in quality, so as to take one\'s breath away.',
    'euphoria': 'A feeling or state of intense excitement and happiness.',
    'melancholy': 'A feeling of pensive sadness, typically with no obvious cause.',
    'nostalgia': 'A sentimental longing or wistful affection for the past.',
    'tranquility': 'The quality or state of being tranquil; calm.',
    'perseverance': 'Persistence in doing something despite difficulty or delay in achieving success.',
    'exquisite': 'Extremely beautiful and delicate.',
    'ethereal': 'Extremely delicate and light in a way that seems not to be of this world.',
    'resonance': 'The quality in a sound of being deep, full, and reverberating.',
    'incandescent': 'Emitting light as a result of being heated.',
    'jubilant': 'Feeling or expressing great happiness and triumph.',
    'dazzling': 'Extremely bright, especially so as to blind the eyes temporarily.',
    'alluring': 'Powerfully and mysteriously attractive or fascinating.',
    'boundless': 'Unlimited or immense.',
    'captivating': 'Capable of attracting and holding interest; charming.',
    'illustrious': 'Well known, respected, and admired for past achievements.',
    'immaculate': 'Perfectly clean, neat, or tidy.',
    'intricate': 'Very complicated or detailed.',
    'jubilation': 'A feeling of great happiness, especially because of a success.',
    'labyrinth': 'A complicated irregular network of passages or paths in which it is difficult to find one\'s way.',
    'mesmerize': 'Hold the complete attention of (someone); transfix.',
    'opulent': 'Ostentatiously costly and luxurious.',
    'patience': 'The capacity to accept or tolerate delay, trouble, or suffering without getting angry or upset.',
    'quixotic': 'Exceedingly idealistic; unrealistic and impractical.',
    'radiance': 'Light or heat as emitted or reflected by something.',
    'spectacular': 'Beautiful in a dramatic and eye-catching way.',
    'whimsical': 'Playfully quaint or fanciful, especially in an appealing and amusing way.',
    'zenith': 'The time at which something is most powerful or successful.',
    'vivacious': 'Attractively lively and animated.',
    'transcendent': 'Beyond or above the range of normal or physical human experience.',
    'harmony': 'The combination of simultaneously sounded musical notes to produce chords and chord progressions having a pleasing effect.'
  };
  
  if (definitions[word]) {
    return definitions[word];
  }
  
  return `The quality of being ${word.toLowerCase()}.`;
};

/**
 * Simulate an example sentence for our demo
 */
const simulateExample = (word: string): string => {
  const examples: Record<string, string> = {
    'serendipity': 'Finding that rare book was pure serendipity.',
    'ephemeral': 'The ephemeral beauty of cherry blossoms lasts only a few days.',
    'mellifluous': 'Her mellifluous voice made the lullaby even more soothing.',
    'luminescence': 'The luminescence of the deep-sea creatures lit up the ocean depths.',
    'eloquent': 'Her eloquent speech moved the entire audience to tears.',
    'resplendent': 'The bride looked resplendent in her white gown.',
    'solitude': 'He found solitude in the quiet cabin by the lake.',
    'quintessential': 'This small cafe is the quintessential Parisian experience.',
    'magnificent': 'The Grand Canyon is truly a magnificent sight.',
    'breathtaking': 'The view from the mountaintop was absolutely breathtaking.',
    'euphoria': 'The team was in a state of euphoria after winning the championship.',
    'melancholy': 'The rainy day matched her melancholy mood.',
    'nostalgia': 'Looking through old photographs filled her with nostalgia.',
    'tranquility': 'The garden offered a sense of tranquility amid the busy city.',
    'perseverance': 'Through perseverance, she finally completed the marathon.',
    'exquisite': 'The chef prepared an exquisite meal for the special occasion.',
    'ethereal': 'The dancer\'s movements were ethereal, as if defying gravity.',
    'resonance': 'His words had a powerful resonance with the audience.',
    'incandescent': 'The incandescent light bulb cast a warm glow over the room.',
    'jubilant': 'The fans were jubilant when their team scored the winning goal.',
    'dazzling': 'The dazzling display of fireworks lit up the night sky.',
    'alluring': 'The alluring aroma of freshly baked bread filled the kitchen.',
    'boundless': 'Children have boundless energy and imagination.',
    'captivating': 'Her captivating story kept everyone on the edge of their seats.',
    'illustrious': 'He comes from an illustrious family of politicians and lawyers.',
    'immaculate': 'The hotel room was kept in immaculate condition.',
    'intricate': 'The watch mechanism features intricate gears and springs.',
    'jubilation': 'There was jubilation in the streets when the war ended.',
    'labyrinth': 'The ancient labyrinth was designed to confuse visitors.',
    'mesmerize': 'The magician\'s skillful tricks mesmerized the audience.',
    'opulent': 'The palace was decorated in an opulent style with gold and marble.',
    'patience': 'Teaching children requires endless patience and understanding.',
    'quixotic': 'His quixotic attempt to climb the mountain without equipment failed.',
    'radiance': 'Her face had a radiance that lit up the room when she smiled.',
    'spectacular': 'The sunset over the ocean was truly spectacular.',
    'whimsical': 'The artist\'s whimsical designs featured talking animals in human clothes.',
    'zenith': 'The company reached its zenith in the early 2000s.',
    'vivacious': 'Her vivacious personality made her the life of every party.',
    'transcendent': 'The music offered a transcendent experience that moved listeners deeply.',
    'harmony': 'The team worked together in perfect harmony to complete the project.'
  };
  
  if (examples[word]) {
    return examples[word];
  }
  
  return `She exemplified ${word.toLowerCase()} in everything she did.`;
};
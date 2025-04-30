export interface Word {
  id: string;
  word: string;
  definition: string;
  example: string;
  addedAt: string;
}

export interface ApiWord {
  word: string;
  results: {
    definition: string;
    examples?: string[];
    partOfSpeech: string;
  }[];
}
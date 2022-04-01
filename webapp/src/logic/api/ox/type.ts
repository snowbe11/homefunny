export type WordType = {
  word: string;
  partOfSpeech: string;
  definition: string;
  translation: string;
  example: string;
  pronunciations: string;
};

export const initialWord: WordType = {
  word: "",
  partOfSpeech: "Noun",
  definition: "",
  translation: "",
  example: "",
  pronunciations: "",
};

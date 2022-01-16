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

type OxEntryType = {
  etymologies: Array<any>;
  language: string;
  pronunciations: Array<any>;
  senses: Array<any>;
};

type OxResultType = {
  text: string;
  lexicalCategory: { id: string; text: string };
  entries: Array<OxEntryType>;
};

const fromEnties = ({
  text,
  lexicalCategory,
  entries,
}: OxResultType): WordType | undefined => {
  try {
    const entry = entries["0"];
    const pronunciations = entry.pronunciations["0"].audioFile;

    let definitions = Array<{ text: string; example: string }>();

    for (const sense of entry.senses) {
      if (sense.definitions) {
        definitions.push({
          text: sense.definitions[0],
          example: sense.examples![0].text,
        });
      }
    }

    return {
      word: text,
      partOfSpeech: lexicalCategory.text,
      definition: definitions[0].text,
      translation: "",
      example: definitions[0].example,
      pronunciations: pronunciations,
    };
  } catch (e) {
    console.log(e);
  }
};

const getPronunce = ({ entries }: OxResultType) : string | undefined => {
  try {
    const entry = entries["0"];

    return entry.pronunciations["0"].audioFile;
  } catch (e) {
    console.log(e);
  }
};

const getPronunceAndExample = ({ text, entries }: OxResultType) => {
  try {
    const entry = entries["0"];

    for (const sense of entry.senses) {
      if (sense.examples) {
        // 예문의 경우 시제가 다르게 들어갈 수 있어서 깔끔하게 되지 않는다.

        for (const exam of sense.examples) {
          if (exam.text.includes(text)) {
            return {
              pronounce: entry.pronunciations["0"].audioFile,
              example: exam.text,
            };
          }
        }

        return {
          pronounce: entry.pronunciations["0"].audioFile,
          example: sense.examples["0"].text,
        };
      } else {
        return {
          pronounce: entry.pronunciations["0"].audioFile,
        };
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export const fetchWordFromOx = async (text: string) => {
  if (process.env.REACT_APP_OX_APP_ID && process.env.REACT_APP_OX_APP_KEY) {
    const language = "en-gb";
    const word_id = text;
    const apiurl = `https://od-api.oxforddictionaries.com:443/api/v2/entries/${language}/${word_id.toLowerCase()}`;

    const options = {
      method: "GET",
      headers: {
        app_id: process.env.REACT_APP_OX_APP_ID,
        app_key: process.env.REACT_APP_OX_APP_KEY,
      },
    };

    const crosproxy = `https://home-funny-server.herokuapp.com/${apiurl}`;

    const result = await fetch(crosproxy, options);
    const json = await result.json();
    if (json.results) {
      return json.results;
    } else {
      return undefined;
    }
  }

  return undefined;
};

export const searchWord = async (text: string) => {
  const results = await fetchWordFromOx(text);

  let wordDefinition = Array<WordType>();

  if (results) {
    const enties = results["0"]!.lexicalEntries;
    for (const e of enties) {
      const cov = fromEnties(e);
      cov && wordDefinition.push(cov);
    }
  }

  return wordDefinition;
};

export const fetchPronunciations = async (text: string) => {
  const results = await fetchWordFromOx(text);
  if (results) {
    const enties = results["0"]!.lexicalEntries;
    for (const e of enties) {
      return getPronunce(e);
    }
  }

  return "";
};

export const fetchPronunceAndExample = async (text: string) => {
  const results = await fetchWordFromOx(text);
  if (results) {
    const enties = results["0"]!.lexicalEntries;
    for (const e of enties) {
      return getPronunceAndExample(e);
    }
  }

  return {
    pronounce: "",
    example: "",
  };
};

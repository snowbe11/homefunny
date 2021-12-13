export type WordType = {
  word: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  pronunciations: string;
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

const fromEnties = ({ text, lexicalCategory, entries }: OxResultType) => {
  try {
    const entry = entries["0"];
    const pronunciations = entry.pronunciations["0"].audioFile;

    let definitions = Array<{ text: string; example: string }>();

    for (const sense of entry.senses) {
      if (sense.definitions) {
        definitions.push({
          text: sense.definitions[0],
          example: sense.examples ? sense.examples[0].text : "",
        });
      }
    }

    return {
      word: text,
      partOfSpeech: lexicalCategory.text,
      definition: definitions[0].text,
      example: definitions[0].example,
      pronunciations: pronunciations,
    };
  } catch (e) {
    console.log(e);
  }
};

const getPronunciations = ({
  text,
  lexicalCategory,
  entries,
}: OxResultType) => {
  try {
    const entry = entries["0"];
    return entry.pronunciations["0"].audioFile;
  } catch (e) {
    console.log(e);
  }
};

export const fetchWordFromOx = async (text: string) => {
  const app_id = "2d5cc32e";
  const app_key = "e3ac76a3e40c62bf1dde28d9a28274af";
  const language = "en-gb";
  const word_id = text;

  const options = {
    method: "GET",
    headers: {
      app_id: app_id,
      app_key: app_key,
    },
  };

  const apiurl = `https://od-api.oxforddictionaries.com:443/api/v2/entries/${language}/${word_id.toLowerCase()}`;
  const crosproxy = `https://cors-anywhere.herokuapp.com/${apiurl}`;

  const result = await fetch(crosproxy, options);
  const json = await result.json();

  if (json.results) {
    return json.results;
  } else {
    return undefined;
  }
};

export const searchWord = async (text: string) => {
  const results = await fetchWordFromOx(text);

  let wordDefinition = Array<WordType>();

  if (results) {
    const enties = results["0"]?.lexicalEntries;
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
    const enties = results["0"]?.lexicalEntries;
    for (const e of enties) {
      return getPronunciations(e);
    }
  }

  return "";
};

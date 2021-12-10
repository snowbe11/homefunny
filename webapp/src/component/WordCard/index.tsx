import React, { useRef, useState } from "react";
import { Button, Card, Divider, Input, Space, Typography } from "antd";
import { PlayCircleTwoTone } from "@ant-design/icons";

type WordType = {
  word: string;
  partOfSpeech: string;
  definition: {
    text: string;
    example: string;
  }[];
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

export const WordCard = () => {
  const [state, setstate] = useState<Array<WordType>>([]);
  const inputRef = useRef<Input>(null);

  const fromEnties = ({ text, lexicalCategory, entries }: OxResultType) => {
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
      definition: definitions,
      pronunciations: pronunciations,
    };
  };

  const RenderWord = ({ word }: { key: React.Key; word: WordType }) => (
    <Card
      title={word.word}
      onClick={() => pronunce(word.pronunciations)}
      extra={
        <PlayCircleTwoTone onClick={() => pronunce(word.pronunciations)} />
      }
    >
      <Space direction="vertical">
        <Typography.Text type="success">{word.partOfSpeech}</Typography.Text>
        {word.definition.map((e, index) => (
          <Space key={index} direction="vertical">
            <Typography.Text>{index}.</Typography.Text>
            <Typography.Text type="warning">{e.text}</Typography.Text>
            {e.example && <Typography.Text italic>{e.example}</Typography.Text>}
            <Divider />
          </Space>
        ))}
      </Space>
    </Card>
  );

  const searchWord = async () => {
    if (inputRef.current) {
      const app_id = "2d5cc32e";
      const app_key = "e3ac76a3e40c62bf1dde28d9a28274af";
      const language = "en-gb";
      const word_id = inputRef.current.input.value;

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

      const entry = json.results;

      let renderResult = Array<WordType>();
      const enties = entry["0"]?.lexicalEntries;
      for (const e of enties) {
        renderResult.push(fromEnties(e));
      }

      setstate(renderResult);
    }
  };

  const pronunce = (audio: string) => {
    new Audio(audio).play();
  };

  return (
    <>
      <Input ref={inputRef} placeholder="type word"></Input>
      <Button onClick={searchWord}>검색</Button>
      {state.map((e) => (
        <RenderWord key={`${e.word}${e.partOfSpeech}`} word={e} />
      ))}
    </>
  );
};

export default WordCard;

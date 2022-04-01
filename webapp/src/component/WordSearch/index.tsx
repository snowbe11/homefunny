import React, { useRef, useState } from "react";
import { Button, Input } from "antd";
import { searchWord } from "logic/api/ox";
import { WordType } from "logic/api/ox/type";
import WordCard from "component/WordCard";

export const WordSearch = () => {
  const [state, setstate] = useState<Array<WordType>>([]);
  const inputRef = useRef<Input>(null);

  const search = () => {
    if (inputRef.current) {
      searchWord(inputRef.current.input.value.trim()).then((result) => {
        if (result) {
          setstate(result);
        }
      });
    }
  };

  return (
    <>
      <Input ref={inputRef} placeholder="type word"></Input>
      <Button onClick={search}>검색</Button>
      {state.map((e) => (
        <WordCard key={`${e.word}${e.partOfSpeech}`} word={e} />
      ))}
    </>
  );
};

export default WordSearch;

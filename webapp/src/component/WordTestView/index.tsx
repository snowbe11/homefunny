import WordCard from "component/WordCard";
import { searchWord, WordType } from "logic/api/ox";
import React, { useEffect, useState } from "react";

export const WordTestView = ({ level }: { level?: string }) => {
  const testMode = level === "DSX";

  const [list, setList] = useState<Array<WordType>>([]);

  const sampleTestWord = [
    "example",
    "oxford",
    "farther",
    "happy",
    "negociation",
    "school",
    "ground",
  ];

  useEffect(() => {
    const remapTest = async (): Promise<Array<WordType>> => {
      let ret = Array<WordType>();
      for (const word of sampleTestWord) {
        try {
          const definition = await searchWord(word);
          ret.push(definition[0]);
        } catch (e) {
          console.log(e);
        }
      }
      return ret;
    };

    remapTest().then((e) => {
      if (e) {
        setList(e);
      }
    });
  }, []);

  return (
    <div>
      <div>{level}</div>
      <div>
        {list?.map((def, index) => {
          return <WordCard key={index} word={def} />;
        })}
      </div>
    </div>
  );
};

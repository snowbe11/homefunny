import WordCard from "component/WordCard";
import { WordType } from "logic/api/ox";
import { getWordTest } from "logic/api/wordTest";
import { WordTestType } from "logic/type";
import React, { useEffect, useState } from "react";

export const WordTestView = ({ level }: { level?: string }) => {
  const [list, setList] = useState<Array<WordType>>([]);

  useEffect(() => {
    if (level) {
      getWordTest(level).then((test: WordTestType) => {
        let testList = Array<WordType>();
        for (const word of Object.keys(test)) {
          const wordType = JSON.parse(test[word]);
          for (const wt of wordType) {
            testList.push(wt);
          }
        }
        setList(testList);
      });
    }
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

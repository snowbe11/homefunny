import { WordType } from "logic/api/ox";
import { getWordTest } from "logic/api/wordTest";
import { WordTestType } from "logic/type";
import React, { useEffect, useState } from "react";
import FillTheBlanks from "./FillTheBlanks";
import Dictation from "./Dictation";

import "./style.css";
import { Button, Space } from "antd";

const shuffle = (array: any[]) => {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

type SaveType = {
  part1: Array<WordType>;
  part2: Array<WordType>;
};

export const WordTestPaper = ({ level }: { level?: string }) => {
  const [test, setTest] = useState<SaveType>({ part1: [], part2: [] });
  const [answerVisiblity, showAnswer] = useState(false);

  useEffect(() => {
    if (level) {
      getWordTest(level).then((test: WordTestType) => {
        let testList = Array<WordType>();
        for (const word of Object.keys(test)) {
          const wordType: WordType = JSON.parse(test[word]);
          testList.push(wordType);
        }

        const q = shuffle(testList);
        const count = Math.round(testList.length / 2);

        setTest({ part1: q.slice(0, count), part2: q.slice(count) });
      });
    }
  }, []);

  const onClickShowAnswer = (visible: boolean) => {
    showAnswer(visible);
  };

  return (
    <div className="word-test-layout">
      <h2>{`<${level}>`}</h2>
      <Dictation list={[...test.part1]} answerVisiblity={answerVisiblity} />
      <br />
      <FillTheBlanks list={[...test.part2]} answerVisiblity={answerVisiblity} />
      <Space>
        <Button onClick={() => onClickShowAnswer(!answerVisiblity)}>
          정답보기
        </Button>
        <Button onClick={() => window.print()}>시험지 출력하기</Button>
      </Space>
    </div>
  );
};

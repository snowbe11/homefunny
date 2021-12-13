import { WordType } from "logic/api/ox";
import { getWordTest } from "logic/api/wordTest";
import { WordTestType } from "logic/type";
import React, { useEffect, useState } from "react";
import FillTheBlanks from "./FillTheBlanks";
import Dictation from "./Dictation";

import "./style.css";
import { Button, Typography } from "antd";

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

export const WordTestView = ({ level }: { level?: string }) => {
  const [part1, setPart1] = useState<Array<WordType>>([]);
  const [part2, setPart2] = useState<Array<WordType>>([]);
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

        setPart1(q.slice(0, count));
        setPart2(q.slice(count));
      });
    }
  }, [level]);

  const onClickShowAnswer = (visible: boolean) => {
    showAnswer(visible);
  };

  return (
    <div className="word-test-layout">
      <Typography.Title>{level}</Typography.Title>
      <Dictation list={[...part1]} answerVisiblity={answerVisiblity} />
      <FillTheBlanks list={[...part2]} answerVisiblity={answerVisiblity} />

      <Button onClick={() => onClickShowAnswer(!answerVisiblity)}>
        정답보기
      </Button>
    </div>
  );
};

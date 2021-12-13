import { WordType } from "logic/api/ox";
import React from "react";

import "./style.css";

const BlankWords = ({ list }: { list: Array<WordType> }) => {
  return (
    <div className="blank-words-container">
      {list.map((word) => (
        <ul key={word.word}>{word.word}</ul>
      ))}
    </div>
  );
};

const WordExample = ({
  list,
  answerVisiblity,
}: {
  list: Array<WordType>;
  answerVisiblity: boolean;
}) => {
  return (
    <div>
      {list.map((word) => (
        <li key={word.word}>
          {answerVisiblity
            ? word.example
            : word.example.replace(word.word, "(    )")}
        </li>
      ))}
    </div>
  );
};

export const FillTheBlanks = ({
  list,
  answerVisiblity,
}: {
  list: Array<WordType>;
  answerVisiblity: boolean;
}) => {
  return (
    <div>
      <WordExample list={list} answerVisiblity={answerVisiblity} />
      <BlankWords list={list} />
    </div>
  );
};

export default FillTheBlanks;

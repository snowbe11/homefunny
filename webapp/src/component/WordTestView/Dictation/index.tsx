import { Card, Divider, Space, Typography } from "antd";
import { PlayCircleTwoTone } from "@ant-design/icons";
import { WordType } from "logic/api/ox";

import "./style.css";

export const Dictation = ({
  list,
  answerVisiblity,
}: {
  list: Array<WordType>;
  answerVisiblity: boolean;
}) => {
  const pronunce = (audio: string) => {
    new Audio(audio).play();
  };

  let displayMode = "show def";
  if (Math.random() < 0.5) {
    displayMode = "show example";
  }

  return (
    <div className="word-test-dictation">
      {list.map((word) =>
        displayMode === "show def" ? (
          <div>
            <span>
              <Typography.Text type="secondary" italic>
                {word.partOfSpeech}
              </Typography.Text>
            </span>
            <span>,&nbsp;&nbsp;</span>
            <span>{answerVisiblity && word.definition}</span>
            <span className="word-test-dictation-answer">{word.word}</span>
          </div>
        ) : (
          <div>
            <span>
              <Typography.Text>{word.example}</Typography.Text>
            </span>
            <span className="word-test-dictation-answer">
              {answerVisiblity && word.word}
            </span>
          </div>
        )
      )}
    </div>
  );
};

export default Dictation;

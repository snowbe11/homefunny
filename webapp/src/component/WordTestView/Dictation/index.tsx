import { Typography } from "antd";
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
  // if (Math.random() < 0.5) {
  //   displayMode = "show example";
  // }

  return (
    <div className="word-test-dictation">
      {list.map((word) =>
        displayMode === "show def" ? (
          <div key={word.word}>
            <span>
              <Typography.Text type="secondary" italic>
                {word.partOfSpeech}
              </Typography.Text>
            </span>
            <span>,&nbsp;&nbsp;</span>
            <span>{word.definition}</span>
            <span
              className={`word-test-dictation-answer${
                answerVisiblity ? "" : "-trasnparent"
              }`}
            >
              {word.word}
            </span>
          </div>
        ) : (
          // 이거 아니고 한 글 뜻으로 해야 하나?
          <div>
            <span>
              <Typography.Text>{word.example}</Typography.Text>
            </span>
            <span
              className={`word-test-dictation-answer${
                !answerVisiblity && "-trasnparent"
              }`}
            >
              {word.word}
            </span>
          </div>
        )
      )}
    </div>
  );
};

export default Dictation;

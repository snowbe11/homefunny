import { Table } from "antd";
import { WordType } from "logic/api/ox";
import { EditOutlined } from "@ant-design/icons";

import "./style.css";

export const Dictation = ({
  list,
  answerVisiblity,
}: {
  list: Array<WordType>;
  answerVisiblity: boolean;
}) => {
  const pronunce = (audio: string) => {
    if (audio.length > 0) {
      try {
        new Audio(audio).play();
      } catch (e) {
        console.log("Dictation", e);
      }
    }
  };

  const dataSource = list.map((e, index) => {
    return {
      key: e.word,
      order: `${index + 1}.`,
      definition: (
        <div
          onClick={() => pronunce(e.pronunciations)}
          className="dictation-table-definition-row"
        >
          <span>{e.partOfSpeech}.</span>
          <span> </span>
          <span>{index % 2 === 1 ? e.definition : e.translation}</span>
        </div>
      ),
      answer: (
        <div className="dictation-table-answer-row">
          <div className="dictation-table-answer-row-word">
            {answerVisiblity ? e.word : ""}
          </div>
          <div className="dictation-table-answer-row-translate">
            {answerVisiblity ? e.translation : ""}
          </div>
        </div>
      ),
    };
  });

  const columns = [
    {
      title: "No.",
      dataIndex: "order",
      key: "order",
      width: "5%",
    },
    {
      title: "Definition",
      dataIndex: "definition",
      key: "key",
    },
    {
      title: "English Word",
      dataIndex: "answer",
      key: "key",
      width: "25%",
    },
  ];

  return (
    <div className="word-test-dictation">
      <h2 className="word-test-dictation-title">
        <EditOutlined style={{ fontSize: "big" }} /> Read and write the words.
        Write both Present and Past forms for verbs.
      </h2>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ position: [] }}
      />
    </div>
  );
};

export default Dictation;

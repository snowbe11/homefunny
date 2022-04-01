import { Table } from "antd";
import { WordType } from "logic/api/ox/type";
import { EditOutlined } from "@ant-design/icons";
import React from "react";

import "./style.css";

const BlankWords = ({ list }: { list: Array<WordType> }) => {
  return (
    <div className="blank-words-container">
      {list.map((word) => (
        <span key={word.word}>{word.word}</span>
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
  const dataSource = list.map((e, index) => {
    // 이건 잘 안된다.
    // 사전에서 검색하는 예제는 시제가 적요된 경우가 있어서 그대로 쓸 수 없다.
    if (e.example) {
      const partial = e.example.split(e.word);

      return {
        key: e.word,
        order: `${index + 1}.`,
        sentance: (
          <div className="fill-blank-table-row">
            {partial[0]}
            <span> </span>
            {answerVisiblity ? (
              <span className="fill-blank-table-answer">{e.word}</span>
            ) : (
              <span className="fill-blank-table-blank">
                {Array(e.word.length).fill("__").join("")}
              </span>
            )}
            <span> </span>
            {partial[1]}
          </div>
        ),
      };
    } else {
      return {
        key: e.word,
        order: `${index + 1}.`,
        sentance: <div className="fill-blank-table-row">{e.definition}</div>,
      };
    }
  });

  const columns = [
    {
      title: "No.",
      dataIndex: "order",
      key: "order",
      width: "5%",
    },
    {
      title: "Sentance",
      dataIndex: "sentance",
      key: "key",
    },
  ];

  return (
    <div>
      <h2 className="fill-blank-test-title">
        <EditOutlined style={{ fontSize: "big" }} /> Read and write the correct
        word from the below.
      </h2>
      <Table
        dataSource={dataSource}
        columns={columns}
        showHeader={false}
        pagination={{ position: [] }}
      />
      <BlankWords list={list} />
    </div>
  );
};

export default FillTheBlanks;

import { Space, Table, Typography } from "antd";
import { WordType } from "logic/api/ox";
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
  const { Title, Text } = Typography;

  const dataSource = list.map((e, index) => {
    // 이건 잘 안된다.
    // 사전에서 검색하는 예제는 시제가 적요된 경우가 있어서 그대로 쓸 수 없다.
    if (e.example) {
      const partial = e.example.split(e.word);

      return {
        order: index + 1,
        sentance: (
          <div className="fill-blank-table-row">
            <Text>
              {partial[0]}
              <span>
                {answerVisiblity
                  ? e.word
                  : Array(e.word.length).fill("__").join("")}
              </span>
              {partial[1]}
            </Text>
          </div>
        ),
      };
    } else {
      return {
        order: index + 1,
        sentance: e.definition,
      };
    }
  });

  const columns = [
    {
      title: "No.",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "Sentance",
      dataIndex: "sentance",
      key: "sentance",
    },
  ];

  return (
    <div>
      <Title level={4}>
        <EditOutlined style={{ fontSize: "big" }} /> Read and write the correct
        word from the below.
      </Title>
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

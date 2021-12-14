import { Table, Typography } from "antd";
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
    new Audio(audio).play();
  };

  const { Title, Text, Paragraph } = Typography;

  const dataSource = list.map((e, index) => {
    return {
      order: index + 1,
      definition: (
        <div
          onClick={() => pronunce(e.pronunciations)}
          className="dictation-table-row"
        >
          <Text strong italic>
            {e.partOfSpeech}.
          </Text>
          <Text> {Math.random() < 0.5 ? e.definition : e.translation}</Text>
        </div>
      ),
      answer: (
        <div className="dictation-table-2line-row">
          <Text strong>{answerVisiblity ? e.word : ""}</Text>
          <Text>{answerVisiblity ? e.translation : ""}</Text>
        </div>
      ),
    };
  });

  const columns = [
    {
      title: "No.",
      dataIndex: "order",
      key: "order",
      width: "10%",
    },
    {
      title: "Definition",
      dataIndex: "definition",
      key: "definition",
      width: "65%",
    },
    {
      title: "English Word",
      dataIndex: "answer",
      key: "answer",
      width: "25%",
    },
  ];

  return (
    <div className="word-test-dictation">
      <Title level={4}>
        <EditOutlined style={{ fontSize: "big" }} /> Read and write the words.
        Write both Present and Past forms for verbs.
      </Title>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ position: [] }}
      />
    </div>
  );
};

export default Dictation;

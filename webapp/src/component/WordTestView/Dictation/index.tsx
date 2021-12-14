import { Space, Table, Typography } from "antd";
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

  const { Title, Text } = Typography;

  const dataSource = list.map((e, index) => {
    return {
      order: index + 1,
      definition: (
        <Space onClick={() => pronunce(e.pronunciations)}>
          <Text strong italic>
            {e.partOfSpeech}.
          </Text>
          <Text> {Math.random() < 0.5 ? e.definition : e.translation}</Text>
        </Space>
      ),
      answer: <Title level={5}>{answerVisiblity ? e.word : " "}</Title>,
    };
  });

  const columns = [
    {
      title: "No.",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "Definition",
      dataIndex: "definition",
      key: "definition",
    },
    {
      title: "English Word",
      dataIndex: "answer",
      key: "answer",
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

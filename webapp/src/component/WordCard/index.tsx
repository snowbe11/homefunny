import { Card, Divider, Space, Typography } from "antd";
import { PlayCircleTwoTone } from "@ant-design/icons";
import { WordType } from "logic/api/ox";

export const WordCard = ({ word }: { word: WordType }) => {
  const pronunce = (audio: string) => {
    new Audio(audio).play();
  };

  return (
    <Card
      title={word.word}
      onClick={() => pronunce(word.pronunciations)}
      extra={
        <PlayCircleTwoTone onClick={() => pronunce(word.pronunciations)} />
      }
    >
      <Space direction="vertical">
        <Typography.Text type="success">{word.partOfSpeech}</Typography.Text>
        {word.definition.map((e, index) => (
          <Space key={index} direction="vertical">
            <Typography.Text>{index}.</Typography.Text>
            <Typography.Text type="warning">{e.text}</Typography.Text>
            {e.example && <Typography.Text italic>{e.example}</Typography.Text>}
            <Divider />
          </Space>
        ))}
      </Space>
    </Card>
  );
};

export default WordCard;

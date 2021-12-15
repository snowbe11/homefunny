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
        <Space direction="vertical">
          <Typography.Text type="warning">{word.definition}</Typography.Text>
          {word.example && (
            <Typography.Text italic>{word.example}</Typography.Text>
          )}
          <Divider />
        </Space>
      </Space>
    </Card>
  );
};

export default WordCard;

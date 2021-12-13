import { Form, Input, Select, Space } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { WordType } from "logic/api/ox";

import "./style.css";

type Props = {
  index: number;
  word: WordType;
};

const WordInputCardFormItem = ({ index, word }: Props) => {
  const { Option } = Select;

  const labels = {
    word: "단어",
    pos: "품사",
    definition: "뜻",
    example: "예제",
  };

  return (
    <Form.Item label={`Q.${index + 1}`}>
      <Space>
        <Form.Item name={[index, "word"]} rules={[{ required: true }]}>
          <Input placeholder={labels["word"]} allowClear />
        </Form.Item>
        <Form.Item name={[index, "pos"]} initialValue="Noun">
          <Select placeholder={labels["pos"]}>
            <Option value="Noun">Noun</Option>
            <Option value="Verb">Verb</Option>
            <Option value="Adjective">Adjective</Option>
            <Option value="Adverb">Adverb</Option>
            <Option value="Pronoun">Pronoun</Option>
            <Option value="Conjunction">Conjunction</Option>
            <Option value="Preposition">Preposition</Option>
            <Option value="Interjection">Interjection</Option>
          </Select>
        </Form.Item>
      </Space>
      <Form.Item name={[index, "definition"]}>
        <Input placeholder={labels["definition"]} allowClear></Input>
      </Form.Item>
      <Form.Item name={[index, "example"]}>
        <TextArea placeholder={labels["example"]} allowClear></TextArea>
      </Form.Item>
    </Form.Item>
  );
};

export default WordInputCardFormItem;

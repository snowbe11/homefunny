import { Button, Dropdown, Form, Input, Menu, Select, Space } from "antd";
import React, { useRef, useState } from "react";
import { PlusCircleTwoTone, DownOutlined } from "@ant-design/icons";
import { addWordTest } from "logic/api/wordTest";
import { searchWord, WordType } from "logic/api/ox";

const { Option } = Select;

export const WordTestWordRegist = () => {
  const [testlist, setTestlist] = useState<Array<WordType>>([]);

  const titleRef = useRef<Input>(null);

  const onWordChanged = (index: number, text: string) => {
    let copied = { ...testlist, word: text };
    setTestlist(copied);
  };

  const onPosChanged = (index: number, text: string) => {
    let copied = { ...testlist, partOfSpeech: text };
    setTestlist(copied);
  };

  const onDefinitionChanged = (index: number, text: string) => {
    let copied = { ...testlist, definition: text };
    setTestlist(copied);
  };

  const onExampleChanged = (index: number, text: string) => {
    let copied = { ...testlist, example: text };
    setTestlist(copied);
  };

  const partOfWord = (
    <Select>
      <Option value="Noun">Noun</Option>
      <Option value="Verb">Verb</Option>
      <Option value="Adjective">Adjective</Option>
      <Option value="Adverb">Adverb</Option>
      <Option value="Pronoun">Pronoun</Option>
      <Option value="Conjunction">Conjunction</Option>
      <Option value="Preposition">Preposition</Option>
      <Option value="Interjection">Interjection</Option>
    </Select>
  );

  const RenderWordInput = ({
    index,
    word,
  }: {
    index: number;
    word: WordType;
  }) => {
    return (
      <Form.List name="word">
        <Form.Item>
          <Form.Item name={`word${index}`} label={`Q.${index + 1}`}>
            <Input
              placeholder="단어"
              //value={word.word}
              //onChange={(e) => onWordChanged(index, e.target.value)}
            />
          </Form.Item>
          <Form.Item name={`pos${index}`}>
            <Input.Group compact>
              <Form.Item name={["pos", "typed"]}>
                <Input
                  placeholder="품사"
                  //value={word.partOfSpeech}
                  //onChange={(e) => onPosChanged(index, e.target.value)}
                ></Input>
              </Form.Item>
              <Form.Item name={["pos", "selection"]}>{partOfWord}</Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.Item name={`def${index}`}>
            <Input
              placeholder="뜻"
              //value={word.definition}
              //onChange={(e) => onDefinitionChanged(index, e.target.value)}
            ></Input>
          </Form.Item>
          <Form.Item name={`exam${index}`}>
            <Input
              placeholder="예문"
              //value={word.example}
              //onChange={(e) => onExampleChanged(index, e.target.value)}
            ></Input>
          </Form.Item>
        </Form.Item>
      </Form.List>
    );
  };

  const initialWord: WordType = {
    word: "",
    partOfSpeech: "",
    definition: "",
    example: "",
    pronunciations: "",
  };

  const addInputWord = () => {
    setTestlist((list) => [...list, initialWord]);
  };

  const saveTest = async (values: ArrayLike<string>) => {
    if (!titleRef.current) {
      alert("이름을 넣어주세요");
      return;
    }

    console.log(values);

    let completed = true;
    let saveForm = Array<WordType>();

    for (const key in values) {
      console.log(key);
      // const word = values[key];
      // const pronunce = await fetchPronunciations(word);
      // if (pronunce) {
      //   saveForm.push({ word: word, desc: JSON.stringify(definition) });
      // } else {
      //   alert(`${values[key]} 잘못된 단어가 있습니다.`);
      //   completed = false;
      //   break;
      // }
    }

    const docName = titleRef.current.input.value;

    // if (completed) {
    //   const result = await addWordTest(docName, saveForm);
    //   if (result) {
    //     console.log("done");
    //   } else {
    //     alert("서버에 접속할 수 없습니다.");
    //   }
    // }
  };

  return (
    <>
      <Input ref={titleRef} placeholder="정상 레벨 또는 워크북 페이지" />
      <div style={{ display: "flex", alignItems: "flex-end", padding: "1rem" }}>
        <Form onFinish={saveTest}>
          {testlist.map((e, index) => (
            <RenderWordInput key={index} index={index} word={e} />
          ))}
          <Button type="primary" htmlType="submit">
            저장
          </Button>
        </Form>

        <Space>
          <Button onClick={addInputWord} style={{ marginBottom: "3.5rem" }}>
            <PlusCircleTwoTone />
          </Button>
        </Space>
      </div>
    </>
  );
};

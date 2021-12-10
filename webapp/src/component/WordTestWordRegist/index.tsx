import { Button, Card, Divider, Form, Input, Space, Typography } from "antd";
import React, { useRef, useState } from "react";
import { PlusCircleTwoTone } from "@ant-design/icons";
import { addWordTest } from "logic/api/wordTest";
import { searchWord } from "logic/api/ox";

export const WordTestWordRegist = () => {
  const [testlist, setTestlist] = useState<Array<string>>([""]);
  const titileRef = useRef<Input>(null);

  const onChangeWord = (index: number, value: string) => {
    let copied = testlist;
    copied[index] = value;
    setTestlist(copied);
  };

  const RenderWordInput = ({
    index,
    value,
  }: {
    index: number;
    value: string;
  }) => {
    return (
      <Form.Item name={`${index}`} label="word">
        <Input
          value={value}
          onChange={(e) => onChangeWord(index, e.target.value)}
        />
      </Form.Item>
    );
  };

  const addInputWord = () => {
    setTestlist((list: Array<string>) => [...list, ""]);
  };

  const saveTest = async (values: ArrayLike<string>) => {
    if (!titileRef.current) {
      alert("이름을 넣어주세요");
      return;
    }

    console.log(values);

    let completed = true;
    let saveForm = [];

    for (const key in values) {
      const word = values[key];
      const definition = await searchWord(word);
      if (definition) {
        saveForm.push({ word: word, desc: JSON.stringify(definition) });
      } else {
        alert(`${values[key]} 잘못된 단어가 있습니다.`);
        completed = false;
        break;
      }
    }

    const docName = titileRef.current.input.value;

    if (completed) {
      const result = await addWordTest(docName, saveForm);
      if (result) {
        console.log("done");
      } else {
        alert("서버에 접속할 수 없습니다.");
      }
    }
  };

  return (
    <>
      <Input ref={titileRef} placeholder="정상 레벨 또는 워크북 페이지" />
      <div style={{ display: "flex", alignItems: "flex-end", padding: "1rem" }}>
        <Form onFinish={saveTest}>
          {testlist.map((e, index) => (
            <RenderWordInput key={index} index={index} value={e} />
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
      <Card title="설정">
        <Typography.Text>대기 시간</Typography.Text>
        <Divider />
        <Space>
          <Button type="dashed">테스트</Button>
        </Space>
      </Card>
    </>
  );
};

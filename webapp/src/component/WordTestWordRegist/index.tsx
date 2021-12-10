import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  Slider,
  Space,
  Typography,
} from "antd";
import React, { useState } from "react";
import { PlusCircleTwoTone } from "@ant-design/icons";
import { addWordTest } from "logic/api/wordTest";

export const WordTestWordRegist = () => {
  const [testlist, setTestlist] = useState<Array<string>>([""]);

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
    console.log(values);

    await addWordTest("DSC 4", Object.values(values));

    console.log("done");
  };

  const marks = {
    1: "1분",
    2: "2분",
    3: "3분",
    10: {
      style: {
        color: "#f50",
      },
      label: <strong>10분</strong>,
    },
  };

  return (
    <>
      <Input placeholder="정상 레벨 또는 워크북 페이지" />
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
        <Slider marks={marks} defaultValue={2} tooltipVisible dots max={10} />

        <Divider />
        <Space>
          <Button type="dashed">테스트</Button>
        </Space>
      </Card>
    </>
  );
};

import React from "react";
import { Form, Input, Select, message, Button } from "antd";
import { NameTag } from "component/NameTag";
import { addEvent } from "logic/api/access";
import { useDispatch } from "react-redux";
import { eventUserThuck } from "logic/reducer/eventUser";
import { UserName } from "logic/type";

type AddEventProp = {
  date: Date;
};

export const AddEvent = ({ date }: AddEventProp) => {
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    let newLog = "";
    switch (values.event) {
      case "bath":
        newLog = `${UserName[values.who]} 화장실 쓰는 날`;
        break;
      case "ban":
        newLog = `${UserName[values.who]} 사용 금지`;
        break;
      case "custom":
        newLog = `${values.log}, ${UserName[values.who]}`;
        break;
    }

    console.log(newLog);

    addEvent(date, newLog).then((e) => {
      if (e) {
        addToast(`${date} ${e.log}`);

        dispatch(eventUserThuck());
      } else {
        console.log("add event failed");
      }
    });
  };

  const addToast = (text: string) => {
    message.success(text);
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      <Form.Item name="event" rules={[{ required: true }]}>
        <Select placeholder="무슨일?">
          <Select.Option value="bath">화장실 사용하는 날</Select.Option>
          <Select.Option value="ban">사용 금지</Select.Option>
          <Select.Option value="custom">직접입력</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="who" rules={[{ required: true }]}>
        <Select placeholder="누구?">
          <Select.Option value="james">
            <NameTag name="james" />
          </Select.Option>
          <Select.Option value="henry">
            <NameTag name="henry" />
          </Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="log">
        <Input placeholder="직접입력" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          등록
        </Button>
      </Form.Item>
    </Form>
  );
};

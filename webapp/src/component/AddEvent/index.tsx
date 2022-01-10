import React from "react";
import { Form, Input, Select, message, Button, TimePicker } from "antd";
import { NameTag } from "component/NameTag";
import { addEvent } from "logic/api/access";
import { useDispatch } from "react-redux";
import { eventUserThuck } from "logic/reducer/eventUser";
import { UserName } from "logic/type";
import { toKrDateString } from "logic/api/misc";
import moment from "moment";

type AddEventProp = {
  date: Date;
};

export const AddEvent = ({ date }: AddEventProp) => {
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    const newLog = [
      values.who,
      values.event,
      values.log,
      values.eventTime,
    ].join("|");

    console.log(newLog);

    addEvent(date, newLog).then((e) => {
      if (e) {
        addToast(`${toKrDateString(date)} ${e.log}`);

        dispatch(eventUserThuck());
      } else {
        console.log("add event failed");
      }
    });
  };

  const addToast = (text: string) => {
    message.success(text);
  };

  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 8 },
  };

  return (
    <Form {...layout} onFinish={onFinish}>
      <Form.Item name="event" label="무슨일?" rules={[{ required: true }]}>
        <Select placeholder="무슨일?">
          <Select.Option value="bath">화장실 사용하는 날</Select.Option>
          <Select.Option value="ban">금지</Select.Option>
          <Select.Option value="custom">직접입력</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="who" label="누구?" rules={[{ required: true }]}>
        <Select placeholder="누구?">
          <Select.Option value="james">
            <NameTag name="james" />
          </Select.Option>
          <Select.Option value="henry">
            <NameTag name="henry" />
          </Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="eventTime" label="시간">
        <TimePicker
          defaultPickerValue={moment("12:00 am", "HH:mm a")}
          use12Hours
          format="h:mm a"
        />
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.event !== currentValues.event
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("event") !== "bath" ? (
            <Form.Item name="log" label="기록" rules={[{ required: true }]}>
              <Input placeholder="직접입력" />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          등록
        </Button>
      </Form.Item>
    </Form>
  );
};

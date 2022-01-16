import React from "react";
import {
  Form,
  Input,
  Select,
  message,
  Button,
  TimePicker,
  Checkbox,
} from "antd";
import { NameTag } from "component/NameTag";
import { addEvent, EventLogType } from "logic/api/eventLog";
import { useDispatch } from "react-redux";
import { eventUserThuck } from "logic/reducer/eventUser";
import { toKrDateString } from "logic/api/misc";
import moment from "moment";

type AddEventProp = {
  date: Date;
};

export const AddEvent = ({ date }: AddEventProp) => {
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    const newLog: EventLogType = {
      loggingTime: new Date(),
      eventType: values.event,
      eventTime: values.eventTime.toDate(),
      eventUser: values.who,
      logText: values.log,
      repeat: values.repeat,
    };

    console.log(newLog);

    addEvent(newLog).then((ret) => {
      if (ret) {
        addToast(
          `${toKrDateString(ret.eventTime)}, ${
            ret.logText
          } 이벤트를 등록했습니다.`
        );

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
    labelCol: { span: 4 },
    //wrapperCol: { span: 8 },
  };

  const repeatDay = [
    { label: "월", value: "mon" },
    { label: "화", value: "tue" },
    { label: "수", value: "wed" },
    { label: "목", value: "thr" },
    { label: "금", value: "fri" },
    { label: "토", value: "sat" },
    { label: "일", value: "sun" },
  ];

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
      <Form.Item name="repeat" label="반복">
        <Checkbox.Group options={repeatDay} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          등록
        </Button>
      </Form.Item>
    </Form>
  );
};

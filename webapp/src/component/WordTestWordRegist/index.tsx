import { Button, Form, FormInstance, Input, message, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { PlusCircleTwoTone } from "@ant-design/icons";
import { addWordTest, getWordTest } from "logic/api/wordTest";
import { fetchPronunceAndExample, initialWord, WordType } from "logic/api/ox";
import WordInputCardFormItem from "./WordInputCardFormItem";
import { WordTestType } from "logic/type";

export const WordTestWordRegist = ({ level }: { level?: string }) => {
  const [testlist, setTestlist] = useState<Array<WordType>>([initialWord]);
  const formRef = useRef<FormInstance>(null);

  useEffect(() => {
    if (level) {
      getWordTest(level).then((test: WordTestType) => {
        let testList = Array<WordType>();
        for (const word of Object.keys(test)) {
          const wordType: WordType = JSON.parse(test[word]);
          testList.push(wordType);
        }

        setTestlist(testList);
      });
    }
  }, []);

  useEffect(() => {
    if (formRef.current) {
      testlist.map((word, index) => {
        formRef.current?.setFieldsValue({
          [index]: {
            ...word,
          },
        });
        return word;
      });
    }
  }, [testlist]);

  const addInputWord = () => {
    setTestlist((list) => [...list, initialWord]);
  };

  const updateFromForm = (values: any) => {
    let newWordList = Array<WordType>();

    for (const key in values) {
      if (key === "title") {
        continue;
      }

      const { word, partOfSpeech, definition, translation, example } =
        values[key];
      if (!word) {
        continue;
      }

      newWordList.push({
        word: word,
        partOfSpeech: partOfSpeech,
        definition: definition,
        translation: translation,
        example: example,
        pronunciations: "",
      });
    }

    setTestlist(newWordList);
  };

  const saveTest = async (values: any) => {
    console.log(values);

    message.loading({
      content: "저장을 하고 있습니다...",
      key: "updatable",
      duration: 0,
    });

    const docName = values["title"];

    let completed = true;
    let saveForm = Array<WordTestType>();

    for (const key in values) {
      if (key === "title") {
        continue;
      }

      const { word, partOfSpeech, definition, translation, example } =
        values[key];
      if (!word) {
        continue;
      }

      const result = await fetchPronunceAndExample(word);
      if (result) {
        const override: WordType = {
          word: word,
          partOfSpeech: partOfSpeech,
          definition: definition,
          translation: translation,
          example: example ? example : result.example,
          pronunciations: result.pronounce,
        };

        saveForm.push({
          word: word,
          desc: JSON.stringify(override),
        });
      } else {
        alert(`${word} 잘못된 단어가 있습니다.`);
        completed = false;
        break;
      }
    }

    if (completed) {
      const result = await addWordTest(docName, saveForm);
      if (result) {
        message.success({
          content: "저장했습니다.",
          key: "updatable",
          duration: 2,
        });
      } else {
        message.error({ content: "서버에 접속할 수 없습니다.", duration: 2 });
      }
    }
  };

  const deleteFormItem = (index: number, text: string) => {
    setTestlist((list) => {
      if (text === "") {
        return list.splice(index, 1);
      } else {
        return list.filter((e) => e.word !== text);
      }
    });
  };

  return (
    <div style={{ display: "flex", alignItems: "flex-end", padding: "1rem" }}>
      <Form
        onFinish={saveTest}
        layout="vertical"
        ref={formRef}
        style={{ flexGrow: "1" }}
      >
        <Form.Item
          name="title"
          rules={[{ required: true }]}
          label="테스트이름"
          initialValue={level}
        >
          <Input placeholder="정상 레벨 또는 워크북 페이지" />
        </Form.Item>
        {testlist.map((e, index) => (
          <WordInputCardFormItem
            key={index}
            index={index}
            word={e}
            deleteItem={deleteFormItem}
          />
        ))}
        <Space size={40}>
          <Button onClick={addInputWord}>
            단어 추가 <PlusCircleTwoTone />
          </Button>
          <Button type="primary" htmlType="submit">
            저장
          </Button>
        </Space>
      </Form>
    </div>
  );
};

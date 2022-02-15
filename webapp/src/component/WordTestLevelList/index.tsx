import { Button, Menu } from "antd";
import { getTestLevelList } from "logic/api/wordTest";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import "./style.css";

//LSA 1-2 p23
//LSA 1-2 p24
//LSA 1-2 p25
//LSA 1-2 p26

//LSA 1-2 p104
//LSA 1-2 p24
//LSA 1-2 p50
//LSA 1-2 p78
//LSA 1-3 p24

type TestInstance = {
  level: string;
  paper: string;
  page: string;
  link: string;
};

type TestButtonProps = {
  level: string;
  label?: string;
};

const TestButton = ({ level, label }: TestButtonProps) => {
  const deleteLevel = (level: string) => {};

  return (
    <Menu.Item key={level}>
      <div className="word-test-level-list-link-container">
        <Link to={`/wordtest/test/${level}`}>{label ? label : level}</Link>
        <div className="word-test-level-list-option">
          <Button type="link">
            <Link to={`/wordtest/regist/${level}`}>수정</Link>
          </Button>
          <Button type="link" onClick={() => deleteLevel(level)}>
            삭제
          </Button>
        </div>
      </div>
    </Menu.Item>
  );
};

type GroupButtonProps = {
  label: string;
  list: Array<TestInstance>;
};

const TestPaperButton = ({ label, list }: GroupButtonProps) => {
  //console.log("TestPaperButton", label, list);
  const collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base",
  });

  return (
    <div className="word-test-level-list-intent">
      <Menu.ItemGroup key={label} title={"/ " + label}>
        {list
          .sort((a, b) => collator.compare(a.paper, b.paper))
          .map((item) => (
            <TestButton key={item.link} level={item.link} label={item.page} />
          ))}
      </Menu.ItemGroup>
    </div>
  );
};

const TestLevelButton = ({ label, list }: GroupButtonProps) => {
  const papers = list.reduce<Array<string>>((result, item) => {
    if (!result.includes(item.paper)) {
      result.push(item.paper);
    }
    return result;
  }, []);

  //console.log("TestLevelButton", label, papers);

  return (
    <Menu.ItemGroup
      key={label}
      title={label + " >"}
      className="word-test-level-list-paper"
    >
      {papers.map((paper) => {
        return (
          <TestPaperButton
            key={paper}
            label={paper}
            list={list.filter((item) => item.paper === paper)}
          />
        );
      })}
    </Menu.ItemGroup>
  );
};

const regex = /[a-zA-Z]+[ ]+[0-9-]+[ ]+[pP.0-9]+/g;

export const WordTestLevelList = () => {
  const [list, setList] = useState<Array<TestInstance>>([]);

  useEffect(() => {
    getTestLevelList().then((list) => {
      const testList = list.map((level) => {
        console.log("test", level.match(regex));

        if (regex.test(level)) {
          const steps = level.split(" ");

          return {
            level: steps[0],
            paper: steps[1],
            page: steps[2],
            link: level,
          };
        } else {
          //console.log("not matched", level);

          return {
            level: "",
            paper: "",
            page: "",
            link: level,
          };
        }
      });

      console.log("testList", testList);

      setList(testList);
    });
  }, []);

  const levelFiltered = list.reduce<Array<string>>((result, item) => {
    if (item.level.length > 0 && !result.includes(item.level)) {
      result.push(item.level);
    }
    return result;
  }, []);

  const onOpenChange = (openKeys: string[]) => {
    console.log(openKeys);
  };

  const menuRef = useRef(null);

  return (
    <Menu mode="inline" theme="light" onOpenChange={onOpenChange}>
      {levelFiltered.map((level) => (
        <TestLevelButton
          key={level}
          label={level}
          list={list.filter((item) => item.level === level)}
        />
      ))}
      {list
        .filter((item) => item.level === "")
        .map((item) => {
          return <TestButton key={item.level} level={item.link} />;
        })}
    </Menu>
  );
};

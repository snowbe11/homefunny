import { Button, Menu } from "antd";
import { getTestLevelList } from "logic/api/wordTest";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./style.css";

export const WordTestLevelList = () => {
  const [list, setList] = useState<Array<string>>([]);

  useEffect(() => {
    getTestLevelList().then((testList) => {
      setList(testList);
    });
  }, []);

  const deleteLevel = (level: string) => {};

  return (
    <Menu>
      {list.map((level) => (
        <Menu.Item key={level}>
          <div className="word-test-level-list-link-container">
            <Link to={`/wordtest/test/${level}`}>{level}</Link>
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
      ))}
    </Menu>
  );
};

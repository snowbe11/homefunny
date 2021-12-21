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

  return (
    <Menu>
      {list.map((level) => (
        <Menu.Item key={level}>
          <div className="word-test-level-list-link-container">
            <Link to={`test/${level}`}>{level}</Link>
            <Button type="link">
              <Link to={`regist/${level}`}>수정</Link>
            </Button>
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );
};

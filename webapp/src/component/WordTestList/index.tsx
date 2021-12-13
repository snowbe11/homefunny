import { Menu } from "antd";
import { getTestLevelList } from "logic/api/wordTest";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const WordTestList = () => {
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
          <Link to={`/test/${level}`}>{level}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

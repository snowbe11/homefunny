import React from "react";

import Layout from "component/Layout";
import { WordTestList } from "component/WordTestList";
import { Link } from "react-router-dom";
import { Button } from "antd";
import WordSearch from "component/WordSearch";

export const WordTestHome = () => {
  return (
    <Layout>
      <div>
        <WordTestList />
      </div>
      <div>
        <WordSearch />
      </div>
      <div>
        <Button>
          <Link to="/test/regist">시험 등록</Link>
        </Button>
      </div>
    </Layout>
  );
};

export default WordTestHome;
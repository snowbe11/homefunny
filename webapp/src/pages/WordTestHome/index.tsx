import React from "react";

import Layout from "component/Layout";
import { WordTestLevelList } from "component/WordTestLevelList";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { PlusCircleTwoTone } from "@ant-design/icons";

import "./style.css";

export const WordTestHome = () => {
  return (
    <Layout>
      <div className="word-test-home-content-container">
        <div>
          <Button>
            <Link to="/homefunny/wordtest/regist">
              새 시험 등록 <PlusCircleTwoTone />
            </Link>
          </Button>
        </div>
        <div className="word-test-home-content-row">
          <WordTestLevelList />
        </div>
      </div>
    </Layout>
  );
};

export default WordTestHome;

import React from "react";
import Layout from "component/Layout";
import { useParams } from "react-router-dom";
import { WordTestWordRegist } from "component/WordTestWordRegist";

import "./style.css";

export const WordTestRegist = () => {
  const params = useParams();

  return (
    <Layout>
      <div className="word-test-content-container">
        <WordTestWordRegist {...params} />
      </div>
    </Layout>
  );
};

export default WordTestRegist;

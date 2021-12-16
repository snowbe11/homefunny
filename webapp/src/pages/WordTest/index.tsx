import React from "react";
import Layout from "component/Layout";
import { useParams } from "react-router-dom";
import { WordTestPaper } from "component/WordTestPaper";

import "./style.css";

export const WordTest = () => {
  const params = useParams();

  return (
    <Layout>
      <div className="word-test-content-container">
        <WordTestPaper {...params} />
      </div>
    </Layout>
  );
};

export default WordTest;

import React from "react";
import Layout from "component/Layout";
import { useParams } from "react-router-dom";
import { WordTestWordRegist } from "component/WordTestWordRegist";

import "./style.css";
import { WordTestView } from "component/WordTestView";

export const WordTest = () => {
  const params = useParams();

  return (
    <Layout>
      <div className="word-test-content-container">
        {params.level === "regist" ? (
          <WordTestWordRegist />
        ) : (
          <WordTestView {...params} />
        )}
      </div>
    </Layout>
  );
};

export default WordTest;

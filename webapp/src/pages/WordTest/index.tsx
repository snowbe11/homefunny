import React from "react";
import Layout from "component/Layout";
import { WordTestView } from "component/WordTestView";
import { useParams } from "react-router-dom";
import { WordTestWordRegist } from "component/WordTestWordRegist";

export const WordTest = () => {
  const params = useParams();

  return (
    <Layout>
      {params.level === "regist" ? (
        <WordTestWordRegist />
      ) : (
        <WordTestView {...params} />
      )}
    </Layout>
  );
};

export default WordTest;

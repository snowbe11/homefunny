import React from "react";
import Layout from "component/Layout";
import { WordTestView } from "component/WordTestView";
import { useParams } from "react-router-dom";
import { WordTestWordRegist } from "component/WordTestWordRegist";

export const WordTest = () => {
  const params = useParams();

  const admin = params.level === "regist";

  return (
    <Layout>
      {admin ? <WordTestWordRegist /> : <WordTestView {...params} />}
    </Layout>
  );
};

export default WordTest;

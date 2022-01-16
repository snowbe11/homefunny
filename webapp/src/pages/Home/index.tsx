import "./style.css";

import Layout from "component/Layout";
import { Typography } from "antd";

const { Paragraph, Title } = Typography;

export const Home = () => {
  return (
    <Layout>
      <div className="home-content-container">
        <Typography>
          <Paragraph>Welcome to Home Funny !</Paragraph>
          <Paragraph>
            <Title level={4}>오늘의 화장실</Title>
            화장실 순번 보기, 간단한 메모
          </Paragraph>
          <Paragraph>
            <Title level={4}>정상 단어 테스트</Title>
            정상 단어 테스트 시험지 출력
          </Paragraph>
        </Typography>
      </div>
    </Layout>
  );
};

export default Home;

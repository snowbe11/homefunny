import React from "react";
import { Layout as L, Menu } from "antd";
import { Link } from "react-router-dom";

import "./style.css";

const { Header, Sider, Content, Footer } = L;

type Props = {};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <L style={{ minHeight: "100vh" }}>
      <Header>
        <div className="layout-title">Home Funny</div>
      </Header>
      <L>
        <Sider theme="light">
          <Menu mode="vertical">
            <Menu.Item key="bath">
              <Link to="/bath">오늘의 화장실</Link>
            </Menu.Item>
            <Menu.Item key="test">
              <Link to="/test">정상 단어 테스트</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content>{children}</Content>
      </L>
      <Footer>This is home funny, 2021</Footer>
    </L>
  );
};

export default Layout;

import React from "react";
import { Layout as L, Menu, Space } from "antd";
import { Link } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";

import "./style.css";
import { HomeNavigation } from "component/HomeNavigation";

const { Header, Sider, Content, Footer } = L;

type Props = {};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <L style={{ minHeight: "100vh" }}>
      <Header className="layout-print-display-none">
        <Menu theme="dark">
          <Menu.Item key="header">
            <Space align="center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/6272/6272776.png"
                width="28px"
                height="auto"
                alt="funny"
              />
              Home Funny
            </Space>
          </Menu.Item>
        </Menu>
      </Header>
      <BrowserView>
        <L>
          <Sider theme="light" className="layout-print-display-none">
            <Menu mode="vertical">
              <Menu.Item key="bath">
                <Link to="/bath">오늘의 화장실</Link>
              </Menu.Item>
              <Menu.Item key="wordtest">
                <Link to="/wordtest">정상 단어 테스트</Link>
              </Menu.Item>
              <Menu.Item key="timeline">
                <Link to="/timeline">스케줄</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content className="layout-content">{children}</Content>
        </L>
      </BrowserView>
      <MobileView>
        <L className="layout-print-display-none">
          <HomeNavigation />
        </L>
        <Content className="layout-content">{children}</Content>
      </MobileView>
      <Footer className="layout-print-display-none">
        This is home funny, 2021
      </Footer>
    </L>
  );
};

export default Layout;

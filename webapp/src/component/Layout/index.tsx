import React from "react";
import { Layout as L, Menu } from "antd";
import { Link } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";

import "./style.css";
import { HomeNavigation } from "component/HomeNavigation";

const { Header, Sider, Content, Footer } = L;

type Props = {};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <L style={{ minHeight: "100vh" }}>
      <Header>
        <div className="layout-title">Home Funny</div>
      </Header>
      <BrowserView>
        <L>
          <Sider theme="light" className="layout-sider">
            <Menu mode="vertical">
              <Menu.Item key="bath">
                <Link to="/bath">오늘의 화장실</Link>
              </Menu.Item>
              <Menu.Item key="wordtest">
                <Link to="/wordtest">정상 단어 테스트</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content>{children}</Content>
        </L>
      </BrowserView>
      <MobileView>
        <Content>
          <HomeNavigation />
          {children}
        </Content>
      </MobileView>
      <Footer>This is home funny, 2021</Footer>
    </L>
  );
};

export default Layout;

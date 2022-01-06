import React from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  CheckSquareOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

export const HomeNavigation = () => {
  const location = useLocation();

  return (
    <Menu mode="horizontal" selectedKeys={[location.pathname]}>
      <Menu.Item key="/">
        <Link to="/">
          <HomeOutlined /> Home Funny
        </Link>
      </Menu.Item>
      <Menu.Item key="/bath">
        <Link to="/bath">
          <CalendarOutlined /> Bath
        </Link>
      </Menu.Item>
      <Menu.Item key="/wordtest">
        <Link to="/wordtest">
          <CheckSquareOutlined /> Word Test
        </Link>
      </Menu.Item>
    </Menu>
  );
};

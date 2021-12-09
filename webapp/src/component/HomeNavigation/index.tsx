import React from "react";
import { Breadcrumb, Menu } from "antd";
import {
  HomeOutlined,
  CheckSquareOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const NaviMenu = (
  <Menu>
    <Menu.Item>
      <Link to="/bath">
        <CalendarOutlined /> Bath
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/wordtest">
        <CheckSquareOutlined /> Word Test
      </Link>
    </Menu.Item>
  </Menu>
);

export const HomeNavigation = () => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to="/">
          <HomeOutlined /> Home Funny
        </Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item overlay={NaviMenu}>
        <Link to="/bath">
          <CalendarOutlined /> Bath
        </Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

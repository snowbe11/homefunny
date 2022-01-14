import React from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  CheckSquareOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

export const HomeNavigation = () => {
  const location = useLocation();

  return (
    <Menu mode="horizontal" selectedKeys={[location.pathname]}>
      <Menu.Item key="/bath">
        <Link to="/bath">
          <CalendarOutlined /> 화장실
        </Link>
      </Menu.Item>
      <Menu.Item key="/wordtest">
        <Link to="/wordtest">
          <CheckSquareOutlined /> 단어시험
        </Link>
      </Menu.Item>
      <Menu.Item key="/timeline">
        <Link to="/timeline">
          <ClockCircleOutlined /> 스케줄
        </Link>
      </Menu.Item>
    </Menu>
  );
};

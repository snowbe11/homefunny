import React from "react";
import { Breadcrumb, Space } from "antd";
import { HomeOutlined } from "@ant-design/icons";

export const HomeNavigation = () => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>Home Funny</Breadcrumb.Item>
      <Breadcrumb.Item>
        <Space>
          <HomeOutlined />
          Home
        </Space>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

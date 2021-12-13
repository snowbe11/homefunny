import { Button, Card, Divider, Space, Typography } from "antd";
import React, { useRef, useState } from "react";

export const WordTestWordRegist = () => {
  return (
    <Card title="설정">
      <Typography.Text>대기 시간</Typography.Text>
      <Divider />
      <Space>
        <Button type="dashed">테스트</Button>
      </Space>
    </Card>
  );
};

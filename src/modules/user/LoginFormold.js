import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { PORT } from "../../set";

const onFinish = (values) => {
  fetch(`${PORT}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Server response:", data);
      if (data.resultMsg === "certified") {
        alert("로그인 성공");
      } else {
        alert("로그인 실패");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("에러가 발생했습니다.");
    });
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const LoginForm = () => (
  <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: "아이디를 입력해 주세요!",
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: "패스워드를 입력해 주세요!",
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);
export default LoginForm;

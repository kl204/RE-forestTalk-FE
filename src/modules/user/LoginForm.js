import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { PORT } from "../../set";
import "../../style/login.css";

const App = () => {
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
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="/signup">register now!</a>
      </Form.Item>
    </Form>
  );
};
export default App;

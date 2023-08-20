import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Select, Checkbox } from "antd";
import { PORT } from "../../set";
import moment from "moment";

const { Option } = Select;

const dateFormat = "YYYY/MM/DD";
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const SignupForm = () => {
  const [uidValidateStatus, setUidValidateStatus] = useState(null);
  const [uidHelp, setUidHelp] = useState(null);
  const [form] = Form.useForm();
  const onFinish = (values) => {
    const { ubirth } = values;
    const dateString = moment(ubirth).format("YY-MM-DD"); // moment 객체를 yy-mm-dd 형식의 문자열로 변환
    values.ubirth = dateString; // values 객체에 dateString 변수 추가
    fetch(`${PORT}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(values);
        console.log("Server response:", data);
        if (data.resultMsg === "certified") {
          alert("회원가입 성공");
          window.location.href = "/login";
        } else {
          alert("회원가입 실패");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("에러가 발생했습니다.");
      });
  };
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };
  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ["zhejiang", "hangzhou", "xihu"],
        prefix: "86",
      }}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <Form.Item
        name="uemail"
        label="이메일"
        rules={[
          {
            type: "email",
            message: "유효하지 않은 이메일 입니다!",
          },
          {
            required: true,
            message: "이메일을 입력 해 주세요!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="uid"
        label="아이디"
        hasFeedback
        validateStatus={uidValidateStatus}
        help={uidHelp}
        rules={[
          {
            required: true,
            message: "아이디를 입력해 주세요!",
          },
          {
            validator: async (_, value) => {
              if (!value) {
                return Promise.resolve();
              }
              try {
                const response = await fetch(
                  `${PORT}/user/checkid?uid=${value}`
                );
                const data = await response.json();
                console.log(data);
                if (data.resultMsg === "certified") {
                  setUidValidateStatus("warning");
                  setUidHelp("이미 사용 중인 아이디입니다.");
                  return Promise.reject();
                } else {
                  setUidValidateStatus("success");
                  setUidHelp(null);
                  return Promise.resolve();
                }
              } catch (error) {
                console.error(error);
                setUidValidateStatus("warning");
                setUidHelp("아이디 중복 체크에 실패했습니다.");
                return Promise.reject();
              }
            },
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="uname"
        label="이름"
        tooltip="이름을 작성해 주세요!"
        rules={[
          {
            required: true,
            message: "본명을 입력해 주세요!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="ubirth"
        label="생일"
        rules={[{ required: true, message: "생일을 입력해 주세요!" }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        name="upw"
        label="비밀번호"
        rules={[
          {
            required: true,
            message: "비밀번호를 입력해 주세요!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="비밀번호 확인"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "비밀번호 확인을 입력해 주세요!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("upw") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("입력한 비밀번호와 일치하지 않습니다!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="unick"
        label="닉네임"
        tooltip="상대방이 어떻게 불러줬으면 하나요?"
        rules={[
          {
            required: true,
            message: "닉네임을 입력 해 주세요!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("이용약관에 동의 해 주세요!")),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          <a href="/agreement">이용약관</a>을 읽고 동의하겠습니다.
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          회원가입
        </Button>
      </Form.Item>
    </Form>
  );
};
export default SignupForm;

import { Button, Checkbox, Form, Input, Tooltip } from "antd";
import React from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { SignupInput } from "../../src/types/auth";
import createFieldsError from "../../src/utils";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
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

interface Props {
  onSubmit: (input: SignupInput) => void;
  submitting: boolean;
  validationErrors: Record<string, string>;
}

const SignupForm: React.FC<Props> = ({
  onSubmit,
  submitting,
  validationErrors,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onSubmit({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  };

  if (
    validationErrors.name ||
    validationErrors.email ||
    validationErrors.password
  ) {
    form.setFields(
      createFieldsError({
        name: validationErrors.name,
        email: validationErrors.email,
        password: validationErrors.password,
      })
    );
  }

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="signup"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label={
          <span>
            Name&nbsp;
            <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: "Please input your name!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                "The two passwords that you entered do not match!"
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject("Should accept agreement"),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" disabled={submitting}>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignupForm;

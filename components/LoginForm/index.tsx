import React from 'react';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';

import { LoginInput } from '../../src/types/auth';

interface Props {
  onSubmit: (input: LoginInput) => void;
  submitting: boolean;
  validationErrors: Record<string, string>;
}

const LoginForm: React.FC<Props> = ({ onSubmit, submitting }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onSubmit({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <Form name="login-form" form={form} onFinish={onFinish}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          disabled={submitting}
        >
          Log in
        </Button>
        Or <Link href="/signup">register now!</Link>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;

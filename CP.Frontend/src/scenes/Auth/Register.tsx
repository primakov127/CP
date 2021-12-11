import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, ContactsOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Register = () => {
  const [form] = Form.useForm();

  return (
    <StyledDiv>
      <Title>Sign Up</Title>

      <Form
        form={form}
        onSubmitCapture={() => form.validateFields().then((values) => console.log(values))}
      >
        <Form.Item name="username" rules={[{ required: true, message: 'Please enter username' }]}>
          <Input placeholder="Username" prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please enter email' },
            {
              pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Please enter correct email: example@gmail.com'
            }
          ]}
        >
          <Input placeholder="Email" prefix={<MailOutlined />} />
        </Form.Item>

        <Form.Item
          name="firstName"
          rules={[
            { required: true, message: 'Please enter First Name' },
            {
              pattern: /^[A-Za-z][A-Za-z]*$/,
              message: 'Please enter First Name without whitespaces'
            }
          ]}
        >
          <Input placeholder="First Name" prefix={<ContactsOutlined />} />
        </Form.Item>

        <Form.Item
          name="lastName"
          rules={[
            { required: true, message: 'Please enter Last Name' },
            {
              pattern: /^[A-Za-z][A-Za-z]*$/,
              message: 'Please enter Last Name without whitespaces'
            }
          ]}
        >
          <Input placeholder="Last Name" prefix={<ContactsOutlined />} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, min: 3, message: 'Please enter min 3 length password' }]}
        >
          <Input.Password placeholder="Password" prefix={<LockOutlined />} />
        </Form.Item>

        <Button block type="primary" htmlType="submit">
          Sign Up
        </Button>

        <StyledLink to={'/auth/login'}>Already have an account?</StyledLink>
      </Form>
    </StyledDiv>
  );
};

const Title = styled.h1`
  text-align: center;
`;

const StyledLink = styled(Link)`
  margin-top: 5px;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 200px auto;
  width: 300px;
`;

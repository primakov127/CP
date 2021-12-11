import { Button, Form, Input, notification } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { authService } from '../../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const RequestPasswordReset = () => {
  const [isRequesting, setIsRequesting] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleRequestPasswordReset = () => {
    form
      .validateFields()
      .then(async (values) => {
        setIsRequesting(true);
        await authService.requestPasswordReset(values);
        setIsRequesting(false);

        notification.success({ message: 'Success', description: 'Check your email!' });
        navigate('/auth/login');
      })
      .catch((_) => _);
  };

  return (
    <StyledDiv>
      <Title>Password Reset</Title>

      <Form form={form} onSubmitCapture={handleRequestPasswordReset}>
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
          <Input placeholder="Enter your email" prefix={<MailOutlined />} />
        </Form.Item>

        <Button block type="primary" htmlType="submit" loading={isRequesting}>
          Send Email
        </Button>

        <LinksContainer>
          <Link to={'/auth/login'}>Sign In</Link>
          <Link to={'/auth/register'}>Sign Up</Link>
        </LinksContainer>
      </Form>
    </StyledDiv>
  );
};

const Title = styled.h1`
  text-align: center;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 200px auto;
  width: 300px;
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
`;

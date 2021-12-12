import { Button, Form, Input, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { useSetRecoilState } from 'recoil';
import { authState } from '../../state';
import { useState } from 'react';
import { userState } from '../../state/user';
import jwt_decode from 'jwt-decode';
import { User } from '../../models/User';

export const Login = () => {
  const [isLogining, setIsLogining] = useState(false);
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);
  const setUser = useSetRecoilState(userState);
  const [form] = Form.useForm();

  const handleLogin = () => {
    form
      .validateFields()
      .then(async (values) => {
        setIsLogining(true);
        const result = await authService.login({
          userNameOrEmail: values.username,
          password: values.password
        });
        setIsLogining(false);

        if (result.isSuccessful) {
          const user: User = jwt_decode(result.token as string);

          localStorage.setItem('token', result.token as string);
          setAuth(result.token as string);
          setUser(user);
          notification.success({
            message: 'Success',
            description: `You are logged in as ${user.userName}!`
          });
          navigate('/events');
        } else {
          notification.error({
            message: 'Error',
            description: 'Username or Password is incorrect!'
          });
        }
      })
      .catch((_) => _);
  };

  return (
    <StyledDiv>
      <Title>Sign In</Title>

      <Form form={form} onSubmitCapture={handleLogin}>
        <Form.Item name="username" rules={[{ required: true, message: 'Please enter username' }]}>
          <Input placeholder="Username" prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: 'Please enter password' }]}>
          <Input.Password placeholder="Password" prefix={<LockOutlined />} />
        </Form.Item>

        <Button block type="primary" htmlType="submit" loading={isLogining}>
          Sign In
        </Button>

        <LinksContainer>
          <Link to={'/auth/register'}>Haven't account?</Link>
          <Link to={'/auth/request-reset'}>Forgot password?</Link>
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

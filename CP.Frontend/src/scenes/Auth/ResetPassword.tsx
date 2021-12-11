import { Button, Form, Input, notification } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { LockOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { authService } from '../../services/authService';

export const ResetPassword = () => {
  const { userId } = useParams();
  const [queryParams] = useSearchParams();
  const [isRequesting, setIsRequesting] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleResetPassword = () => {
    form
      .validateFields()
      .then(async (values) => {
        setIsRequesting(true);
        await authService.resetPassword({
          userId: userId as string,
          resetToken: queryParams.get('token') as string,
          newPassword: values.password
        });
        setIsRequesting(false);

        notification.success({ message: 'Success', description: 'Your password was changed!' });
        navigate('/auth/login');
      })
      .catch((_) => _);
  };

  useEffect(() => {
    if (!queryParams.get('token')) {
      navigate('/auth/login');
    }
  }, [queryParams, navigate]);

  return (
    <StyledDiv>
      <Title>Password Reset</Title>

      <Form form={form} onSubmitCapture={handleResetPassword}>
        <Form.Item
          name="password"
          rules={[{ required: true, min: 3, message: 'Please enter min 3 length password' }]}
        >
          <Input.Password placeholder="Enter your new password" prefix={<LockOutlined />} />
        </Form.Item>

        <Button block type="primary" htmlType="submit" loading={isRequesting}>
          Change password
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

import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '../../state';
import { Login } from './Login';
import { Register } from './Register';
import { RequestPasswordReset } from './RequestPasswordReset';

export const Auth = () => {
  const navigate = useNavigate();
  const auth = useRecoilValue(authState);

  useEffect(() => {
    auth && navigate('/events');
  }, [auth, navigate]);

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="request-reset" element={<RequestPasswordReset />} />
    </Routes>
  );
};

import { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '../../state';
import { Add } from './Add';
import { List } from './List';

export const Events = () => {
  const navigate = useNavigate();
  const auth = useRecoilValue(authState);

  useEffect(() => {
    !auth && navigate('/auth/login');
  }, [auth, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="list" />} />
      <Route path="add" element={<Add />} />
      <Route path="list" element={<List />} />
    </Routes>
  );
};

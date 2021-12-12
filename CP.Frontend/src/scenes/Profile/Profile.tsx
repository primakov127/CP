import { Card, Statistic } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { authState } from '../../state';
import { userState } from '../../state/user';

export const Profile = () => {
  const user = useRecoilValue(userState);
  const auth = useRecoilValue(authState);
  const navigate = useNavigate();

  useEffect(() => {
    !auth && navigate('/auth/login');
  }, [auth, navigate]);

  return (
    <StyledDiv>
      <Card title="User profile:">
        <StyledStatistic title="Username" value={user.userName} />
        <StyledStatistic title="First Name" value={user.firstName} />
        <StyledStatistic title="Last Name" value={user.lastName} />
        <StyledStatistic title="Email" value={user.email} />
      </Card>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 100px auto;
  width: 400px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const StyledStatistic = styled(Statistic)`
  margin-bottom: 10px;
`;

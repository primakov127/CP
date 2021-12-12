import { Menu, notification } from 'antd';
import {
  CalendarOutlined,
  PlusSquareOutlined,
  UserOutlined,
  ProfileOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { authState } from '../state';
import { userState } from '../state/user';

const { SubMenu } = Menu;

export const MainMenu = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authState);
  const user = useRecoilValue(userState);
  const [displayMenu, setDisplayMenu] = useState(false);
  const [currentLink, setCurrentLink] = useState('/events/list');

  useEffect(() => {
    auth ? setDisplayMenu(true) : setDisplayMenu(false);
  }, [auth]);

  const handleMenuClick = (e: any) => {
    const key = e.key;

    if (key === 'logout') {
      localStorage.clear();
      setAuth('');
      notification.success({ message: 'Success', description: 'You are logouted!' });
      navigate('/auth/login');
      return;
    }

    setCurrentLink(key);
    navigate(key);
  };

  return displayMenu ? (
    <StyledMenu onClick={handleMenuClick} selectedKeys={[currentLink]} mode="horizontal">
      <Menu.Item key="/events/list" icon={<CalendarOutlined />}>
        Events
      </Menu.Item>
      <Menu.Item key="/events/add" icon={<PlusSquareOutlined />}>
        Add Event
      </Menu.Item>
      <SubMenu icon={<UserOutlined />} title={user.userName}>
        <Menu.Item key="/profile" icon={<ProfileOutlined />}>
          Profile
        </Menu.Item>
        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          Logout
        </Menu.Item>
      </SubMenu>
    </StyledMenu>
  ) : null;
};

const StyledMenu = styled(Menu)`
  margin-bottom: 30px;

  svg {
    margin-bottom: 6px;
  }

  li:nth-child(3) {
    margin-left: auto;
  }
`;

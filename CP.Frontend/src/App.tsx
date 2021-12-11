import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Auth } from './scenes/Auth/Auth';
import { Events } from './scenes/Events/Events';
import { Layout } from 'antd';
import styled from 'styled-components';

const { Content } = Layout;

export const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <Layout style={{ minHeight: '100%' }}>
          <ContentContainer>
            <Routes>
              <Route path="auth/*" element={<Auth />} />
              <Route path="events/*" element={<Events />} />
              <Route path="/" element={<Navigate replace to="/events" />} />
            </Routes>
          </ContentContainer>
        </Layout>
      </Router>
    </RecoilRoot>
  );
};

const ContentContainer = styled(Content)`
  padding: 0 50px;
`;

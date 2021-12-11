import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Auth } from './scenes/Auth/Auth';
import { Events } from './scenes/Events/Events';

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="auth/*" element={<Auth />} />
          <Route path="events/*" element={<Events />} />
          <Route path="/" element={<Navigate replace to="/events" />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;

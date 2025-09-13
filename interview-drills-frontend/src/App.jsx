import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import DrillDetail from './pages/DrillDetail';
import AttemptHistory from './pages/AttemptHistory';
import { AuthContext } from './contexts/AuthContext';

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/drill/:id" element={<DrillDetail />} />
        <Route path="/history" element={<AttemptHistory />} />
      </Routes>
    </>
  );
}

export default App;

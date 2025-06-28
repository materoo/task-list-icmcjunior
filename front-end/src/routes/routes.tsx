import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Account from '../pages/Account';
import { useUser } from '../contexts/UserContext'; 

const AppRoutes = () => {
  const { user, loading } = useUser(); 

  if (loading) {
    return <div>Carregando rotas...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Navigate to="/login" replace />} />
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />
      <Route path="/account" element={user ? <Account /> : <Navigate to="/login" replace />} />
      <Route path="*" element={<div>Página não encontrada - Faça login e tente novamente</div>} />
    </Routes>
  );
};

export default AppRoutes;
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Account from '../pages/Account';
import { useEffect, useState } from "react";
import axios from 'axios';

const AppRoutes = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const axiosGet = async() => {
      const {data} = await axios.get('/users/account')
      setUser(data);
    };
    axiosGet();
  }, []);

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register setUser={setUser} />} />
      <Route path="/" element={<Login setUser={setUser} />} />
      <Route path="/account" element={<Account />} />
    </Routes>
  );
};

export default AppRoutes;
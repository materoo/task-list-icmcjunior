import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

import Input from '../../components/Input';
import FilledButton from '../../components/FilledButton';
import { Wrapper, FormContainer, Title, RegisterText } from './style';
import { useUser } from '../../contexts/UserContext';
import axios from 'axios';

const Login = () => {
  const { setUser } = useUser();
  const [redirect, setRedirect] = useState(false);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!login.trim() || !password.trim()) {
      alert('Preencha todos os campos');
      return;
    }

    try {
      const { data: userDoc } = await axios.post("/users/login", {
        login,
        password
      });

      const mappedUser = {
        id: userDoc._id || userDoc.id,
        name: userDoc.name,
        cpf: userDoc.cpf,
        email: userDoc.email,
        dataNascimento: userDoc.birthdate || userDoc.dataNascimento,
      };

      setUser(mappedUser);
      setRedirect(true);
    } catch (error) {
      alert("Falha no login. Verifique suas credenciais.");
      console.error(error);
    }
  };

  if (redirect) return <Navigate to="/home" />;

  return (
    <Wrapper>
      <FormContainer onSubmit={handleSubmit}>
        <Title>Login</Title>

        <Input
          label="Email ou CPF"
          name="login"
          type="text"
          placeholder="Digite seu email ou CPF"
          value={login}
          onChange={(_name, value) => setLogin(value)}
        />
        <Input
          label="Senha"
          name="password"
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(_name, value) => setPassword(value)}
        />
        <FilledButton label="Entrar" icon={<LogIn size={18} />} type="submit" />

        <RegisterText>
          Não tem uma conta? <Link to="/register">Cadastre-se</Link>
        </RegisterText>
      </FormContainer>
    </Wrapper>
  );
};

export default Login;
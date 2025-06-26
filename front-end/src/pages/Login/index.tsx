import FilledButton from '../../components/FilledButton';
import Input from '../../components/Input';
import { Wrapper, FormContainer, Title, RegisterText } from './style';
import { Link, Navigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import React, { useState } from "react";
import axios from "axios";

type LoginProps = {
  setUser: React.Dispatch<React.SetStateAction<null>>;
};

const Login = ({ setUser }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(email && password){ 
      try{
        const {data : userDoc } = await axios.post("/users/login", {
        email,
        password
      })
      
      setUser(userDoc);
      setRedirect(true);
      } catch (error) {
        alert(`Erro ao logar: ${error}`);
      }
      
    }else{
      alert("Por favor, insira Email e Senha.")
    }
    console.log(`Email enviado: ${email} Senha Enviada: ${password}`)
  };

  if(redirect) return <Navigate to="/home" />

  return (
    <Wrapper>
      <FormContainer onSubmit={handleSubmit}>
        <Title>Login</Title>
        <Input
          label="Email ou CPF"
          name="email"
          type="text"
          placeholder="Digite seu email"
          value = {email}
          onChange={(_, value) => setEmail(value)}
        />
        <Input
          label="Senha"
          name="password"
          type="password"
          placeholder="Digite sua senha"
          onChange={(_, value) => setPassword(value)}
        />
        <FilledButton label="Login" icon={<LogIn size={18}/>} type='submit' />
        <RegisterText>
          Não possui conta? <Link to="/register">Cadastre-se aqui!</Link>
        </RegisterText>
      </FormContainer>
    </Wrapper>
  );
};

export default Login;

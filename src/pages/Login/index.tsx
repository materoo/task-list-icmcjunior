import FilledButton from '../../components/FilledButton';
import Input from '../../components/Input';
import { Wrapper, FormContainer, Title, RegisterText } from './style';
import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const Login = () => {
  return (
    <Wrapper>
      <FormContainer>
        <Title>Login</Title>
        <Input
          label="Email ou CPF"
          name="email"
          type="text"
          placeholder="Digite seu email ou CPF"
        />
        <Input
          label="Senha"
          name="password"
          type="password"
          placeholder="Digite sua senha"
        />
        <Link to="/home"><FilledButton label="Login" icon={<LogIn size={18} />} /></Link>
        <RegisterText>
          Não possui conta? <Link to="/register">Cadastre-se aqui!</Link>
        </RegisterText>
      </FormContainer>
    </Wrapper>
  );
};

export default Login;

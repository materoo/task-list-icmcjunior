import { ArrowLeft, LogIn } from 'lucide-react';
import Input from '../../components/Input';
import FilledButton from '../../components/FilledButton';
import { Container, Title, Back, Form } from './style';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Back onClick={() => navigate(-1)}>
        <ArrowLeft size={20} />
        Voltar
      </Back>

      <Title>Cadastre-se</Title>

      <Form>
         <Input
          label="Nome"
          name="name"
          type="text"
          placeholder="Digite seu nome completo"
        />
         <Input
          label="Data de Nascimento"
          name="birthdate"
          type="date"
          placeholder="__/__/____"
        />
         <Input
          label="CPF"
          name="cpf"
          type="cpf"
          placeholder="Digite seu CPF"
        />
         <Input
          label="Email"
          name="email"
          type="text"
          placeholder="Digite seu email"
        />
        <Input
          label="Senha"
          name="password1"
          type="password"
          placeholder="Digite sua senha"
        />
        <Input
          label="Repita sua Senha"
          name="password2"
          type="password"
          placeholder="Digite sua senha novamente"
        />

        <FilledButton label="Cadastrar" icon={<LogIn size={18} />} type="submit" />
      </Form>
    </Container>
  );
};

export default Register;

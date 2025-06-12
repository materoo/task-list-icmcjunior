import { useState } from 'react';
import { ArrowLeft, LogIn } from 'lucide-react';
import Input from '../../components/Input';
import FilledButton from '../../components/FilledButton';
import { Container, Title, Back, Form } from './style';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  // dados do formulário
  const [form, setForm] = useState({
    name: '',
    birthdate: '',
    cpf: '',
    email: '',
    password1: '',
    password2: '',
  });


  // função para lidar com mudanças nos campos do formulário
  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, birthdate, cpf, email, password1, password2 } = form;

    // teste de validação dos campos
    if (
      !name.trim() ||
      !birthdate.trim() ||
      !cpf.trim() ||
      !email.trim() ||
      !password1.trim() ||
      !password2.trim()
    ) {
      alert('Preencha todos os campos');
      return;
    }

    if (password1 !== password2) {
      alert('As senhas não coincidem');
      return;
    }

    if (cpf.replace(/\D/g, '').length !== 11) {
      alert('CPF inválido');
      return;
    }

    if (birthdate.replace(/\D/g, '').length !== 8) {
      alert('Data de nascimento inválida');
      return;
    }

    // valores aparecendo no console por enquanto até a integração com o backend
    console.log('infos do forms:', form);
  };

  return (
    <Container>
      <Back onClick={() => navigate(-1)}>
        <ArrowLeft size={20} />
        Voltar
      </Back>

      <Title>Cadastre-se</Title>

      <Form onSubmit={handleSubmit}>
        <Input
          label="Nome"
          name="name"
          type="text"
          placeholder="Digite seu nome completo"
          onChange={handleChange}
        />
        <Input
          label="Data de Nascimento"
          name="birthdate"
          type="date"
          placeholder="DD/MM/AAAA"
          onChange={handleChange}
        />
        <Input
          label="CPF"
          name="cpf"
          type="cpf"
          placeholder="Digite seu CPF"
          onChange={handleChange}
        />
        <Input
          label="Email"
          name="email"
          type="text"
          placeholder="Digite seu email"
          onChange={handleChange}
        />
        <Input
          label="Senha"
          name="password1"
          type="password"
          placeholder="Digite sua senha"
          onChange={handleChange}
        />
        <Input
          label="Repita sua Senha"
          name="password2"
          type="password"
          placeholder="Digite sua senha novamente"
          onChange={handleChange}
        />

        <FilledButton label="Cadastrar" icon={<LogIn size={18} />} type="submit" />
      </Form>
    </Container>
  );
};

export default Register;

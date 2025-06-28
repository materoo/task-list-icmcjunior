import { useState } from 'react';
import { ArrowLeft, LogIn } from 'lucide-react';
import Input from '../../components/Input';
import FilledButton from '../../components/FilledButton';
import { Container, Title, Back, Form } from './style';
import { useNavigate, Navigate} from 'react-router-dom';
import type React from 'react';
import axios from 'axios';
import { useUser } from '../../contexts/UserContext';

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [redirect, setRedirect] = useState(false);

  const [form, setForm] = useState({
    name: '',
    birthdate: '',
    cpf: '',
    email: '',
    password1: '',
    password2: '',
  });

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, birthdate, cpf, email, password1, password2 } = form;


    //validação de campos preenchidos
    if (!name.trim() || !birthdate.trim() || !cpf.trim() || !email.trim() || !password1.trim() || !password2.trim()) {
      alert('Preencha todos os campos');
      return;
    }

    //validação de senha e confirmação de senha
    if (password1 !== password2) {
      alert('As senhas não coincidem');
      return;
    }

    //validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Formato de email inválido');
        return;
    }

    //validação de CPF
    if (cpf.replace(/\D/g, '').length !== 11) {
      alert('CPF inválido');
      return;
    }

    //validação de data de nascimento
    const validateBirthdate = (dateString: string) => {
        const [day, month, year] = dateString.split('/').map(Number);
        if (!day || !month || !year) return { isValid: false, message: 'Formato de data inválido. Use DD/MM/AAAA.' };
        const birthDate = new Date(year, month - 1, day);
        if (birthDate.getFullYear() !== year || birthDate.getMonth() !== month - 1 || birthDate.getDate() !== day) return { isValid: false, message: 'Data de nascimento inválida.' };
        if (birthDate > new Date()) return { isValid: false, message: 'Data de nascimento não pode ser no futuro.' };
        return { isValid: true, message: '' };
    };

    const birthdateValidation = validateBirthdate(birthdate);
    if (!birthdateValidation.isValid) {
        alert(birthdateValidation.message);
        return;
    }

    try{
      const {data : userDoc} = await axios.post("/users",{
        name,
        birthdate,
        cpf,
        email,
        password1,
      });

      setUser(userDoc);
      setRedirect(true);
    } catch (error) {
      alert(`Erro ao cadastrar: ${error}`);
    }
    console.log('infos do forms:', form);
  };

  if(redirect) return <Navigate to="/" />
  return (
    <Container>
      <Back onClick={() => navigate(-1)}>
        <ArrowLeft size={20} />
        Voltar
      </Back>

      <Title>Cadastre-se</Title>

      <Form onSubmit={handleSubmit}>
        <Input label="Nome" name="name" type="text" placeholder="Digite seu nome completo" value={form.name} onChange={handleChange} />
        <Input label="Data de Nascimento" name="birthdate" type="date" placeholder="DD/MM/AAAA" value={form.birthdate} onChange={handleChange} />
        <Input label="CPF" name="cpf" type="cpf" placeholder="Digite seu CPF" value={form.cpf} onChange={handleChange} />
        <Input label="Email" name="email" type="text" placeholder="Digite seu email" value={form.email} onChange={handleChange} />
        <Input label="Senha" name="password1" type="password" placeholder="Digite sua senha" value={form.password1} onChange={handleChange} />
        <Input label="Repita sua Senha" name="password2" type="password" placeholder="Digite sua senha novamente" value={form.password2} onChange={handleChange} />

        <FilledButton label="Cadastrar" icon={<LogIn size={18} />} type="submit" />
      </Form>
    </Container>
  );
};

export default Register;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  ChevronLeft,
  UserCircle2,
  Edit3,
  LogOut,
  Trash2,
  Check,
  X,
} from 'lucide-react';
import ActionItem from '../../components/ActionItem';
import AlertBox from '../../components/AlertBox';
import Input from '../../components/Input';
import { useUser } from '../../contexts/UserContext';
import {
  Wrapper,
  Header,
  Content,
  Avatar,
  UserName,
  UserInfo,
  ActionsContainer,
  Form,
  ButtonContainer,
  ConfirmButton,
  CancelButton,
} from './style';

const Account: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser, loading } = useUser();

  const [formData, setFormData] = useState(() => {
    if (user) {
      return {
        ...user,
        dataNascimento: user.dataNascimento || '',
      };
    }
    return {
      id: '',
      name: '',
      cpf: '',
      email: '',
      dataNascimento: '',
    };
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        ...user,
        dataNascimento: user.dataNascimento || '',
      });
    }
  }, [user]);

  const handleEnterEditMode = () => {
    if (user) {
      setFormData({
        ...user,
        dataNascimento: user.dataNascimento || '',
      });
    }
    setIsEditing(true);
  };
  const handleExitEditMode = () => setIsEditing(false);

  const handleFormChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.id) {
      console.error("ID do usuário não disponível para atualização.");
      return;
    }

    try {
      // Envia os dados atualizados para o backend
      const response = await axios.put(`/users/${user.id}`, {
        name: formData.name,
        email: formData.email,
        dataNascimento: formData.dataNascimento,
      });

      // Atualiza o contexto com os novos dados recebidos do backend
       const updatedUserData = {
        ...user, 
        id: response.data._id || response.data.id || user.id, // Prefer backend ID, fallback to current
        name: response.data.name,
        email: response.data.email,
        dataNascimento: response.data.dataNascimento || response.data.birthdate || formData.dataNascimento,
      };
      setUser(updatedUserData)
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar o perfil do usuário:", error);
    }
  };

  const handleOpenDeleteAlert = () => {
    setIsAlertOpen(true);
  };

  const handleCloseDeleteAlert = () => {
    setIsAlertOpen(false);
  };

  const handleConfirmDeletion = async () => {
    if (!user || !user.id) {
      console.error("ID do usuário não disponível para exclusão.");
      handleCloseDeleteAlert();
      return;
    }

    try {
      await axios.delete(`/users/${user.id}`);
      setUser(null);
      handleCloseDeleteAlert();
      navigate('/');
    } catch (error) {
      console.error("Erro ao deletar a conta:", error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  if (loading) {
    return <div>Carregando informações do usuário...</div>;
  }

  if (!user) {
    return (
      <Wrapper>
        <Header>
          <button onClick={() => navigate(-1)}>
            <ChevronLeft size={24} />
            Voltar
          </button>
        </Header>
        <Content>
          <div>Nenhum usuário logado. Por favor, faça login.</div>
        </Content>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Header>
        <button onClick={() => isEditing ? handleExitEditMode() : navigate(-1)}>
          <ChevronLeft size={24} />
          Voltar
        </button>
      </Header>

      <Content>
        <Avatar>
          <UserCircle2 size={96} strokeWidth={1} />
        </Avatar>
        {isEditing ? (
          <Form onSubmit={handleConfirmEdit}>
            <Input
              label="Nome"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleFormChange}
            />
            <Input
              label="CPF"
              name="cpf"
              type="text"
              value={formData.cpf}
              disabled
            />
            <Input
              label="Email"
              name="email"
              type="text"
              value={formData.email}
              onChange={handleFormChange}
            />
            <Input
              label="Data de Nascimento"
              name="dataNascimento"
              type="date"
              value={formData.dataNascimento}
              onChange={handleFormChange}
            />
            <ButtonContainer>
              <ConfirmButton type="submit">
                <Check size={20} />
                Confirmar
              </ConfirmButton>
              <CancelButton type="button" onClick={handleExitEditMode}>
                <X size={20} />
                Cancelar
              </CancelButton>
            </ButtonContainer>
          </Form>
        ) : (
          <>
            <UserName>{user.name}</UserName>
            <UserInfo>CPF: {user.cpf}</UserInfo>
            <UserInfo>Email: {user.email}</UserInfo>
            <UserInfo>Data de Nascimento: {user.dataNascimento}</UserInfo>

            <ActionsContainer>
              <ActionItem
                icon={<Edit3 size={24} />}
                text="Editar conta"
                onClick={handleEnterEditMode}
              />
              <ActionItem
                icon={<LogOut size={24} />}
                text="Sair"
                onClick={handleLogout}
              />
              <ActionItem
                icon={<Trash2 size={24} />}
                text="Excluir conta"
                variant="destructive"
                onClick={handleOpenDeleteAlert}
              />
            </ActionsContainer>
          </>
        )}
      </Content>
      {isAlertOpen && (
        <AlertBox
          title="Excluir Conta?"
          onClose={handleCloseDeleteAlert}
          onConfirm={handleConfirmDeletion}
        >
          Essa ação é permanente!
        </AlertBox>
      )}
    </Wrapper>
  );
};

export default Account;
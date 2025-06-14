import React, { useState } from 'react';
import { data, useNavigate } from 'react-router-dom';
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

// dados de exemplo até a implementação do backend
const mockUser = {
  id: 1,
  name: 'Nome Pessoa',
  cpf: '000.000.00-00',
  email: 'email@pessoa.com',
  dataNascimento: '01/01/2000',
};

const Account: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(mockUser);
  const [formData, setFormData] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleEnterEditMode = () => {
    setFormData(user);
    setIsEditing(true);
  };
  const handleExitEditMode = () => setIsEditing(false);

  const handleFormChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(formData);
    setIsEditing(false);
  };


  const handleOpenDeleteAlert = () => {
    setIsAlertOpen(true);
  };

  const handleCloseDeleteAlert = () => {
    setIsAlertOpen(false);
  };

  const handleConfirmDeletion = () => {
    handleCloseDeleteAlert();
    navigate('/');
  };

  const handleLogout = () => {
    navigate('/');
  };

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
            <UserInfo>{user.cpf}</UserInfo>
            <UserInfo>{user.email}</UserInfo>

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
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  UserCircle2,
  Edit3,
  LogOut,
  Trash2,
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
};

const Account: React.FC = () => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleEnterEditMode = () => setIsEditing(true);
  const handleExitEditMode = () => setIsEditing(false);

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
          <Form>
            <Input
              label="Nome"
              name="name"
              type="text"
              value={mockUser.name}
              readOnly 
            />
            <Input
              label="CPF"
              name="cpf"
              type="text"
              value={mockUser.cpf}
              disabled 
            />
            <Input
              label="Email"
              name="email"
              type="text"
              value={mockUser.email}
              readOnly
            />
            <ButtonContainer>
              <ConfirmButton type="button" onClick={handleExitEditMode}>
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
            <UserName>{mockUser.name}</UserName>
            <UserInfo>{mockUser.cpf}</UserInfo>
            <UserInfo>{mockUser.email}</UserInfo>

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
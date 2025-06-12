import React from 'react';
import { Menu, User } from 'lucide-react';
import { Container, IconWrapper, SearchInput } from './style';

const Header: React.FC = () => {
  return (
    <Container>
      <IconWrapper>
        <Menu size={30} color="#5f6368" />
      </IconWrapper>
      <SearchInput type="text" placeholder="Buscar tarefas" />
      <IconWrapper>
        <User size={30} color="#5f6368" />
      </IconWrapper>
    </Container>
  );
};

export default Header;
import React from 'react';
import { Menu, User } from 'lucide-react';
import { Container, IconWrapper, SearchInput } from './style';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onMenuClick?: () => void; 
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <Container>
      <IconWrapper onClick={onMenuClick}>
        <Menu size={30} color="#5f6368" />
      </IconWrapper>
      <SearchInput type="text" placeholder="Buscar tarefas" />
      <Link to="/account" style={{ textDecoration: 'none' }}>
        <IconWrapper>
          <User size={30} color="#5f6368" />
        </IconWrapper>
      </Link>
    </Container>
  );
};

export default Header;
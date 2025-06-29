// src/components/Sidebar/index.tsx

import React from 'react';
import { CheckCircle, XCircle, Clock, Home as HomeIcon } from 'lucide-react';
import { Backdrop, SidebarContainer, Title, FilterList, FilterItem, FilterText, IconWrapper } from './style';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { key: 'todas', name: 'Todas', icon: <HomeIcon size={20} /> },
  { key: 'em_andamento', name: 'Em andamento', icon: <Clock size={20} /> },
  { key: 'feitas', name: 'Feitas', icon: <CheckCircle size={20} /> },
  { key: 'atrasadas', name: 'Atrasadas', icon: <XCircle size={20} /> },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeFilter, onFilterChange }) => {
  const handleFilterClick = (filterName: string) => {
    onFilterChange(filterName);
    onClose(); // Fecha a sidebar após selecionar um filtro
  };

  return (
    <>
      <Backdrop isOpen={isOpen} onClick={onClose} />
      <SidebarContainer isOpen={isOpen}>
        <Title>Filtros</Title>
        <FilterList>
          {filters.map((filter) => (
            <FilterItem
              key={filter.key}
              isActive={activeFilter === filter.name.toLowerCase()}
              onClick={() => handleFilterClick(filter.name.toLowerCase())}
            >
              <IconWrapper>{filter.icon}</IconWrapper>
              <FilterText>{filter.name}</FilterText>
            </FilterItem>
          ))}
        </FilterList>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
import React from 'react';
import {
  ClipboardList,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import {
  Backdrop,
  SidebarContainer,
  Title,
  FilterList,
  FilterItem,
} from './style';


//define os filtros
const filters = [
  { name: 'Todas', key: 'all', icon: <ClipboardList size={22} /> },
  { name: 'Em andamento', key: 'pending', icon: <RefreshCw size={22} /> },
  { name: 'Feitas', key: 'completed', icon: <CheckCircle2 size={22} /> },
  { name: 'Atrasadas', key: 'overdue', icon: <AlertCircle size={22} /> },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeFilter: string;
  onFilterChange: (filterKey: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeFilter, onFilterChange }) => {
  return (
    <>
      <Backdrop isOpen={isOpen} onClick={onClose} />
      <SidebarContainer isOpen={isOpen}>
        <Title>Filtrar notas</Title>
        <FilterList>
          {filters.map((filter) => (
            <FilterItem
              key={filter.key}
              isActive={activeFilter === filter.key}
              onClick={() => onFilterChange(filter.key)}
            >
              {filter.icon}
              {filter.name}
            </FilterItem>
          ))}
        </FilterList>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
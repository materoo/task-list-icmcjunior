import React from 'react';
import type { Status } from '../../@types/tasks';
import { Check, MoreVertical } from 'lucide-react';
import { Container, Header, TimeInfo, CheckboxWrapper, Title, Description, OptionsIcon } from './style';

interface TaskCardProps {
  id: string;
  status: Status;
  time: string;
  date: string;
  title: string;
  description?: string;
  onToggle: (id: string) => void;
  onDelete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  id, 
  status, 
  time, 
  date, 
  title, 
  description, 
  onToggle, 
  onDelete 
}) => {
  const isCompleted = status === 'completed';

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(id);
  };
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <Container status={status}>
      <Header>
        <TimeInfo>{time} - {date}</TimeInfo>
        <OptionsIcon onClick={handleDelete}>
            <MoreVertical size={20} />
        </OptionsIcon>
      </Header>

      <Title>{title}</Title>

      {description && <Description>{description}</Description>}
      
      <CheckboxWrapper onClick={handleToggle} isCompleted={isCompleted}>
        {isCompleted && <Check size={16} color="white" />}
      </CheckboxWrapper>
    </Container>
  );
};

export default TaskCard;
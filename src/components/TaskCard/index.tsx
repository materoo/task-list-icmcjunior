import React from 'react';
import { Check, MoreVertical } from 'lucide-react';
import {
  Container,
  Header,
  TimeInfo,
  CheckboxWrapper,
  Title,
  Description,
  type TaskCardContainerProps,
} from './style';

// propriedades do task card
interface TaskCardProps extends TaskCardContainerProps {
  id: number;
  time: string;
  date: string;
  title: string;
  description: string;
  onToggle: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  status,
  time,
  date,
  title,
  description,
  onToggle
}) => {
  const isCompleted = status === 'completed';

  return (
    <Container status={status}>
      <Header>
        <TimeInfo>
          <span>{time}</span>
          <span>{date}</span>
        </TimeInfo>
        <CheckboxWrapper onClick={() => onToggle(id)}>
          {isCompleted && <Check size={24} />}
        </CheckboxWrapper>
      </Header>

      <Title status={status}>{title}</Title>
      <Description>{description}</Description>

    </Container>
  );
};

export default TaskCard;
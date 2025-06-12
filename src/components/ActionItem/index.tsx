import React from 'react';
import { Container } from './style';

interface ActionItemProps {
  icon: React.ReactElement;
  text: string;
  variant?: 'default' | 'destructive';
  onClick?: () => void;
}

const ActionItem: React.FC<ActionItemProps> = ({
  icon,
  text,
  variant = 'default',
  onClick,
}) => {
  return (
    <Container variant={variant} onClick={onClick}>
      {icon}
      {text}
    </Container>
  );
};

export default ActionItem;
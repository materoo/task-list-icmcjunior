import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from './style';

interface FloatingButtonProps {
  onClick: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <Plus size={28} color="white" />
    </Button>
  );
};


export default FloatingButton;
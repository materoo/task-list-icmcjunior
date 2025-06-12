import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from './style';

const FloatingButton: React.FC = () => {
  return (
    <Button>
      <Plus size={28} color="white" />
    </Button>
  );
};

export default FloatingButton;
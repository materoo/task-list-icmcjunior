import React, { useState } from 'react';
import {
  Backdrop,
  ModalContainer,
  ModalHeader,
  Input,
  TextArea,
  ModalFooter,
  Button,
} from './style';

interface AddTaskModalProps {
  onClose: () => void;
  onAddTask: (task: { title: string; description: string; dueDate: string }) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ onClose, onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dueDate) {
      alert('Por favor, preencha o título e a data de vencimento.');
      return;
    }
    onAddTask({ title, description, dueDate });
  };

  return (
    <Backdrop onClick={onClose}>
      <ModalContainer onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
        <ModalHeader>Nova Tarefa</ModalHeader>
        
        <Input
          type="text"
          placeholder="Título da tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextArea
          placeholder="Descrição (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        
        <ModalFooter>
          <Button type="button" onClick={onClose}>Cancelar</Button>
          <Button type="submit" primary>Adicionar Tarefa</Button>
        </ModalFooter>
      </ModalContainer>
    </Backdrop>
  );
};

export default AddTaskModal;
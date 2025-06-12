import React from 'react';
import { X, Trash2 } from 'lucide-react';
import {
  Backdrop,
  AlertContainer,
  AlertTitle,
  AlertSubtitle,
  AlertFooter,
  AlertButton,
} from './style';

interface AlertProps {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
}

const AlertBox: React.FC<AlertProps> = ({
  onClose,
  onConfirm,
  title,
  children,
}) => {

  // faz com que  quando clicar dentro do alertbox ele não feche, mas somente ao clicar fora dele
  const handleAlertClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Backdrop onClick={onClose}>
      <AlertContainer onClick={handleAlertClick}>
        <AlertTitle>{title}</AlertTitle>
        <AlertSubtitle>{children}</AlertSubtitle>
        <AlertFooter>
          <AlertButton variant="secondary" onClick={onClose}>
            <X size={20} />
            Cancelar
          </AlertButton>
          <AlertButton variant="primary" onClick={onConfirm}>
            <Trash2 size={20} />
            Excluir
          </AlertButton>
        </AlertFooter>
      </AlertContainer>
    </Backdrop>
  );
};

export default AlertBox;
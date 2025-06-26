import { Button, IconWrapper } from './style';
import type { ReactNode } from 'react';

interface FilledButtonProps {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  icon?: ReactNode;
}

const FilledButton = ({
  label,
  onClick,
  type = 'button',
  disabled = false,
  icon,
}: FilledButtonProps) => {
  return (
    <Button onClick={onClick} type={type} disabled={disabled}>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {label}
    </Button>
  );
};

export default FilledButton;

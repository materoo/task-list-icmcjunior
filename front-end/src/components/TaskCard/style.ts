import styled, { css } from 'styled-components';
import type { Status } from '../../@types/tasks';

interface TaskCardContainerProps {
  status: Status;
}

const getStatusStyles = (status: Status) => {
  switch (status) {
    case 'overdue':
      return css`
        background-color: #FC9C9C;
      `;
    case 'completed':
      // Modificação aqui para restaurar seu estilo original
      return css`
        background-color: #D5F0E5;
        opacity: 0.7;

        ${Title}, ${Description} {
          text-decoration: line-through;
          color: #555;
        }
      `;
    case 'pending':
    default:
      return css`
        background-color: #D5F0E5;
      `;
  }
};

export const Container = styled.div<TaskCardContainerProps>`
  padding: 16px;
  border-radius: 8px;
  position: relative;
  ${({ status }) => getStatusStyles(status)}
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const TimeInfo = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #333;
`;

export const CheckboxWrapper = styled.div<{ isCompleted: boolean }>`
  position: absolute;
  bottom: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  border: 2px solid #555;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ isCompleted }) => (isCompleted ? '#042AE9' : 'transparent')};
  border-color: ${({ isCompleted }) => (isCompleted ? '#042AE9' : '#555')};
  transition: background-color 0.2s;
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px;
  color: #1a1a1a;
  padding-right: 30px; // Espaço para não sobrepor o ícone de opções
`;

export const Description = styled.p`
  font-size: 14px;
  color: #555;
  margin: 0;
  padding-bottom: 30px; // Espaço para não sobrepor o checkbox
`;

export const OptionsIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;
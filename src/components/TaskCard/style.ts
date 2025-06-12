import styled, { css } from 'styled-components';

// as 3 possibilidades de status para a tarefa
export interface TaskCardContainerProps {
    status: 'overdue' | 'pending' | 'completed';
}

// pegar a cor baseada no status
const getStatusStyles = (status: TaskCardContainerProps['status']) => {
    switch (status) {
        case 'overdue':
            return css`
        background-color: #FC9C9C;
        color: #413F42;
      `;
        case 'completed':
            return css`
        background-color: #D5F0E5;
        color: #413F42;
        opacity: 0.6;
        h3, p, span {
          opacity: 0.5;
        }
      `;
        case 'pending':
        default:
            return css`
        background-color: #D5F0E5;
        color: #413F42;
      `;
    }
};

export const Container = styled.div<TaskCardContainerProps>`
  padding: 1.25rem; /* 20px */
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
  font-family: 'Poppins', sans-serif;
  transition: background-color 0.5s ease, color 0.5s ease;
  ${({ status }) => getStatusStyles(status)}
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

export const TimeInfo = styled.div`
  display: flex;
  flex-direction: column;

  span:first-child {
    font-size: 2rem;
    font-weight: 700;
  }

  span:last-child {
    font-size: 0.9rem;
    font-weight: 700;
  }
`;

export const CheckboxWrapper = styled.div`
  width: 28px;
  height: 28px;
  border: 2px solid currentColor;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: transparent;
  color: #413F42;
`;

export const Title = styled.h3<TaskCardContainerProps>`
  font-size: 2rem;
  font-weight: 800;
  margin: 0.5rem 0;
  color: #413F42;
  transition: color 0.5s ease, opacity 0.5s ease;

`;

export const Description = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  opacity: 0.9;
  transition: color 0.5s ease, opacity 0.5s ease;
`;
import styled, { css } from 'styled-components';

interface ContainerProps {
  variant?: 'default' | 'destructive';
}

export const Container = styled.button<ContainerProps>`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem 0;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  color: #042AE9;

  ${({ variant }) =>
    variant === 'destructive' &&
    css`
      color: #FF3E3E;
    `}

  svg {
    flex-shrink: 0;
  }
`;
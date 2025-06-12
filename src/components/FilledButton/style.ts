import styled from 'styled-components';

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #042AE9;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: #0022cc;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
`;

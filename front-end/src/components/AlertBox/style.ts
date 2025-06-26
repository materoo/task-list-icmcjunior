import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

export const AlertContainer = styled.div`
  background-color: #FC9C9C;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const AlertTitle = styled.h2`
  font-size: 2.1rem;
  font-weight: 800;
  margin: 0;
  color: #ffffff;
  text-align: center;
`;

export const AlertSubtitle = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #ffffff;
  margin-top: 0.5rem;
  text-align: center;
  line-height: 1.5;
`;

export const AlertFooter = styled.footer`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-top: 0.4rem;
  padding-top: 1.5rem;
  border-top: 1px solid #ffffff;
`;


export const AlertButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.75;
  }

  ${({ variant }) =>
    variant === 'primary' &&
    `
      background-color: #FF3E3E;
      color: white;
    `}

  ${({ variant }) =>
    variant === 'secondary' &&
    `
      background-color: #ffffff;
      color: #FF3E3E;
      border: 1px solid #e0e0e0;
    `}
`;
import styled, { css } from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  overflow-y: auto;
  align-items: flex-start;

  @media (min-width: 768px) {
    align-items: center;
  }
`;

export const ModalContainer = styled.form`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  margin-top: 2rem;

  @media (min-width: 768px) {
    width: 100%;
    margin-top: 0;
    padding: 2rem;
  }
`;

export const ModalHeader = styled.h2`
  font-weight: bold;
  margin-bottom: 1.25rem;
  color: #202124;
  font-size: 1.6rem;

  @media (min-width: 768px) {
    font-size: 1.8rem;
  }
`;

const sharedInputStyles = css`
  width: 93%;
  padding: 1rem;
  border: 1px solid #dadce0;
  border-radius: 8px;
  font-size: 1.1rem;
  background-color: #f8f9fa;

  &:focus {
    outline: none;
    border-color: #1a73e8;
    background-color: #ffffff;
  }
`;

export const Input = styled.input`
  ${sharedInputStyles}
`;

export const TextArea = styled.textarea`
  ${sharedInputStyles}
  resize: vertical;
  min-height: 100px;
`;

export const ModalFooter = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;

  @media (min-width: 576px) {
    flex-direction: row-reverse;
    justify-content: flex-start;
  }
`;

export const Button = styled.button<{ primary?: boolean }>`
  padding: 1rem 1.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color 0.2s ease, opacity 0.2s ease;
  text-align: center;
  width: 100%;
  background-color: ${({ primary }) => (primary ? '#1a73e8' : '#ffffff')};
  color: ${({ primary }) => (primary ? 'white' : '#1a73e8')};
  border-color: ${({ primary }) => (primary ? 'transparent' : '#dadce0')};

  &:hover {
    opacity: 0.85;
  }

  @media (min-width: 576px) {
    width: auto;
    min-width: 120px;
  }
`;
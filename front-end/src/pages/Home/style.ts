import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f4f5f7;
`;

export const TaskList = styled.main`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  flex-grow: 1;
`;

export const FloatingButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #042AE9;
  color: white;
  border: none;
  font-size: 36px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in-out;
  z-index: 1000;

  &:hover {
    transform: scale(1.05);
  }
`;
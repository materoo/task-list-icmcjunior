import styled from 'styled-components';

export const Container = styled.div`
  background-color: #f8f9fa;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
`;

export const TaskList = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;

  /* responsiviadade para diferentes telas */
  @media (min-width: 768px) {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }
`;
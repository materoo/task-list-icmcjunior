import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  height: 90vh;
  justify-content: center;
  align-items: center;
  padding: 0px;
  font-family: 'Poppins', sans-serif;
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: center;
`;

export const Title = styled.h1`
  color: #0033ff;
  font-size: 42px;
  font-weight: 800;
`;

export const RegisterText = styled.p`
  font-size: 12px;

  a {
    color: #0033ff;
    text-decoration: none;
    font-weight: 600;
  }

  a:hover {
    text-decoration: underline;
  }
`;

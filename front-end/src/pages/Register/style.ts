import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Poppins', sans-serif;

  @media (min-width: 768px) {
    justify-content: center;
  }
`;

export const Back = styled.div`
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 6px;
  color: black;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 16px;
  cursor: pointer;

  @media (min-width: 768px) {
    position: absolute;
    top: 32px;
    left: 32px;
  }
`;

export const Title = styled.h1`
  color: #0033ff;
  font-size: 42px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 24px;

  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;

  @media (min-width: 768px) {
    max-width: 400px;
  }

  hr {
    margin: 8px 0;
    border: none;
    border-top: 1px solid #ccc;
  }
`;

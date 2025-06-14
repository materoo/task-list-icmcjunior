import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 1rem;
  font-family: 'Poppins', sans-serif;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  button {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 1rem;
  }
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 2rem;

  @media (min-width: 768px) {
    max-width: 400px;
    margin: 0 auto;
  }
`;

export const Avatar = styled.div`
  margin-bottom: 1rem;
`;

export const UserName = styled.h2`
  font-size: 1.75rem;
  font-weight: bold;
  margin: 0;
`;

export const UserInfo = styled.p`
  font-size: 1rem;
  color: #5f6368;
  margin: 0.25rem 0;
`;

export const ActionsContainer = styled.footer`
  margin-top: 4rem;
  width: 100%;
  border-top: 1px solid #ffffff;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.85;
  }
`;

export const ConfirmButton = styled(ActionButton)`
  background-color: #042AE9;
  color: white;
`;

export const CancelButton = styled(ActionButton)`
  background-color: #FC9C9C;
  color: white;
`;
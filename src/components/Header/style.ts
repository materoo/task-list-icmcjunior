import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  font-family: 'Poppins', sans-serif;
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const IconWrapper = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
`;

export const SearchInput = styled.input`
  flex-grow: 1;
  margin: 0 1rem;
  padding: 0.75rem 1rem;
  border: 1px solid #dadce0;
  border-radius: 8px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #0033ff;
  }
`;
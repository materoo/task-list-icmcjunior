import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-bottom: 10px;
  font-family: Poppins, sans-serif;
`;

export const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  color: #333;
  font-weight: 500;
  float: left;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const InputContainer = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 10px 38px 10px 10px;
  border: 1px solid #aaa;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const ToggleVisibility = styled.span`
  position: absolute;
  right: 10px;
  top: 68%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #555;
  height: 100%;
  display: flex;
  align-items: center;
`;

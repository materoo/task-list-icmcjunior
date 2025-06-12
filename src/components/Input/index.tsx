import { useState } from 'react';
import {
  Container,
  InputContainer,
  Label,
  ToggleVisibility,
  InputWrapper,
} from './style';
import { Eye, EyeOff } from 'lucide-react';

// interface para as props do componente
interface InputProps {
  label: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'cpf' | 'date';
  name?: string;
  onChange?: (name: string, value: string) => void;
}


// mascaras do cpf e data de aniversário
const maskCPF = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

const maskDate = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d{1,4})$/, '$1/$2');
};



const Input = ({ label, placeholder, type = 'text', name, onChange }: InputProps) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState('');
  const isPassword = type === 'password';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name;
    let valueToUpdate = e.target.value;

    // aplica as mascaras de cpf e data de aniversário
    if (type === 'cpf') {
      const rawValue = valueToUpdate.replace(/\D/g, '').slice(0, 11);
      valueToUpdate = maskCPF(rawValue);
    } else if (type === 'date') {
      const rawValue = valueToUpdate.replace(/\D/g, '').slice(0, 8);
      valueToUpdate = maskDate(rawValue);
    }
       setValue(valueToUpdate);

   if (onChange && inputName) {
      onChange(inputName, valueToUpdate);
    }
  };

  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <InputWrapper>
        <InputContainer
          id={name}
          name={name}
          placeholder={placeholder}
          type={isPassword ? (visible ? 'text' : 'password') : 'text'}
          value={value}
          onChange={handleChange}
          autoComplete="off"
        />
        {isPassword && (
          <ToggleVisibility onClick={() => setVisible(!visible)}>
            {visible ? <EyeOff size={20} /> : <Eye size={20} />}
          </ToggleVisibility>
        )}
      </InputWrapper>
    </Container>
  );
};

export default Input;
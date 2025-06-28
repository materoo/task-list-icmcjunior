// src/contexts/UserContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  cpf: string;
  email: string;
  dataNascimento: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/users/profile');
        const userData = response.data;

        if (userData) {
          const mappedUser: User = {
            id: userData._id || userData.id,
            name: userData.name,
            cpf: userData.cpf,
            email: userData.email,
            dataNascimento: userData.birthdate, // Mantenha como 'birthdate' aqui
          };
          setUser(mappedUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Erro ao buscar perfil do usuário:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
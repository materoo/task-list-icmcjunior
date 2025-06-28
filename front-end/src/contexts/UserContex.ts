import React from "react";

export interface User {
  name: string;
  cpf: string;
  email: string;
  dataNascimento: string;
  // add other user fields as needed
}

export interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const UserContext = React.createContext<UserContextType | undefined>(undefined);

export function useUserContext(): UserContextType {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}
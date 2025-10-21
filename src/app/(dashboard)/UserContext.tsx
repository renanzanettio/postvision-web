"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Define a estrutura do usuário que vem da API
export interface Usuario {
  id_usuario: number;
  nome_usuario: string;
  sobrenome_usuario: string;
  email_usuario: string;
  telefone_usuario: string;
  genero_usuario: string;
  data_nascimento_usuario: string;
  created_at_usuario: string;
}

// Define o tipo do contexto (pode ser o usuário ou null)
interface UserContextType {
  usuario: Usuario | null;
  setUsuario: React.Dispatch<React.SetStateAction<Usuario | null>>;
}

// Cria o contexto já tipado
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider que busca o usuário e compartilha os dados
export function UserProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/user", { credentials: "include" });
        if (!res.ok) return;
        const data = await res.json();
        setUsuario(data.usuario);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    }
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook para acessar o usuário em qualquer componente
export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser deve ser usado dentro de um UserProvider");
  }
  return context;
}

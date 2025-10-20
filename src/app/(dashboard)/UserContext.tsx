"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface Usuario {
  id_usuario: number;
  nome_usuario: string;
  cpf_usuario?: string;
  sobrenome_usuario: string;
  email_usuario: string;
  telefone_usuario: string;
  genero_usuario: string;
  data_nascimento_usuario: string;
  created_at_usuario: string;
}

const UserContext = createContext<Usuario | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/user", { credentials: "include" });
      const data = await res.json();
      if (res.ok) setUsuario(data.usuario);
    }
    fetchUser();
  }, []);

  return <UserContext.Provider value={usuario}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}

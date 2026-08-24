"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { apiGetSessionStatsByUserId } from "@/lib/api";
import { useUser } from "./UserContext";

interface WeeklyData {
    date: string;
    corretos: number;
    total: number;
}

interface MonthlyData {
    date: string;
    totalReps: number;
}

interface SessionStats {
    streak: number;
    weekly: WeeklyData[];
    monthly: MonthlyData[];
    /** duração média das sessões em segundos (retornado pela API) */
    avgDuration?: number;
    /** precisão média em % entre todas as sessões (retornado pela API) */
    avgAccuracy?: number;
}

interface SessionContextType {
    stats: SessionStats | null;
    loading: boolean;
    /** true assim que sabemos que o usuário já tem pelo menos 1 sessão registrada */
    hasSessions: boolean;
    refresh: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType>({
    stats: null,
    loading: true,
    hasSessions: false,
    refresh: async () => { },
});

export function SessionProvider({ children }: { children: ReactNode }) {
    const usuario = useUser();

    const [stats, setStats] = useState<SessionStats | null>(null);
    const [loading, setLoading] = useState(true);

    async function fetchStats() {
        if (!usuario?.id_usuario) return;

        setLoading(true);

        try {
            const res = await apiGetSessionStatsByUserId(usuario.id_usuario);
            const data = await res.json();
            setStats(data);
        } catch (error) {
            console.error("Erro ao buscar estatísticas de sessão:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!usuario?.id_usuario) return;
        fetchStats();
    }, [usuario?.id_usuario]);

    // "weekly" só cobre os últimos 7 dias e pode estar vazio mesmo com
    // histórico antigo, então também conferimos "monthly" (que agrega
    // TODAS as sessões por dia) e a própria duração média antes de
    // decidir que o usuário realmente nunca treinou.
    const hasSessions =
        !!stats &&
        (
            (stats.monthly?.length ?? 0) > 0 ||
            (stats.weekly?.length ?? 0) > 0 ||
            (typeof stats.avgDuration === "number" && stats.avgDuration > 0)
        );

    return (
        <SessionContext.Provider value={{ stats, loading, hasSessions, refresh: fetchStats }}>
            {children}
        </SessionContext.Provider>
    );
}

export function useSession() {
    return useContext(SessionContext);
}

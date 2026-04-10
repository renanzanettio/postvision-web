"use client";
import styles from "./WeeklyPerformanceChart.module.css";
import { useSession } from "@/app/(dashboard)/SessionContext";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid
} from 'recharts';

const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

export default function WeeklyPerformanceChart() {
    const { stats } = useSession();

    const chartData = stats?.weekly.map((item) => ({
        name: DAYS[new Date(item.date).getDay()],
        corretos: item.corretos,
        total: item.total,
    })) ?? [];

    return (
        <div className={styles.graphContainer}>
            <div className={styles.title}>Desempenho Semanal</div>
            <div className={styles.subtitle}>Agachamento</div>
            <div className={styles.chart}>
                <ResponsiveContainer className={styles.chartSize}>
                    <BarChart data={chartData} barCategoryGap="20%">
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            iconType="circle"
                            formatter={(value) => (
                                <span style={{ color: '#1c1c1c', fontSize: 16 }}>{value}</span>
                            )}
                        />
                        <Bar dataKey="corretos" name="Corretos" fill="#1B0066" radius={[0, 0, 0, 0]} />
                        <Bar dataKey="total" name="Total" fill="#E3D93F" radius={[0, 0, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

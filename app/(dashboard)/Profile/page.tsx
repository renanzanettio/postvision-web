"use client";
import styles from "./Profile.module.css";
import Menu from "../../components/Menu/Menu";
import RightBoard from "../../components/RightBoard/RightBoard";
import DashboardGraphs from "@/public/images/dashboard-graphs.svg";
import { useState } from "react";
import FilterRow from "../../components/FilterRow/FilterRow";
import WeeklyPerformanceChart from "../../components/WeeklyPerformanceChart/WeeklyPerformanceChart";
import LastTrainingChart from "../../components/LastTrainingChart/LastTrainingChart";
import MonthlyComparisionChart from "../../components/MonthlyComparisionChart/MonthlyComparisionChart";
import Image from "next/image";

export default function Profile() {
  const [selected, setSelected] = useState("Todos");

  return (
    <div className={styles.reverseContainer}>
      <div className={styles.mainContainer}>
        <div className={styles.profileContainer}>
          <div className={styles.profileInfo}>
            
          </div>
          <div className={styles.contentContainer}>Informações Pessoais</div>
          <div className={styles.contentContainer}>Segurança</div>
        </div>
      </div>

      <RightBoard />
    </div>
  );
}

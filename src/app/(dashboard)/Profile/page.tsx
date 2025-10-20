"use client";
import styles from "./Profile.module.css";
import Menu from "../../components/Menu/Menu";
import RightBoard from "../../components/RightBoard/RightBoard";
import ProfileIcon from "@/public/images/carlos.png";
import { useState } from "react";
import FilterRow from "../../components/FilterRow/FilterRow";
import WeeklyPerformanceChart from "../../components/WeeklyPerformanceChart/WeeklyPerformanceChart";
import LastTrainingChart from "../../components/LastTrainingChart/LastTrainingChart";
import MonthlyComparisionChart from "../../components/MonthlyComparisionChart/MonthlyComparisionChart";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { da } from "react-day-picker/locale";
import { useUser } from "../UserContext";

export default function Profile() {

  const usuario = useUser();

  const [selected, setSelected] = useState("Todos");

  const profileData = {
    name: usuario?.nome_usuario || "Informação não encontrada",
    sobrenome: usuario?.sobrenome_usuario || "Informação não encontrada",
    cpf: usuario?.cpf_usuario || "Informação não encontrada",
    genero: usuario?.genero_usuario || "Informação não encontrada",
    dataNascimento: usuario?.data_nascimento_usuario || "Informação não encontrada",
  };

  const securityData = {
    telefone: "(13) 91234-5678",
    email: "Carlos@gmail.com",
  };

  return (
    <div className={styles.reverseContainer}>
      <div className={styles.mainContainer}>
        <div className={styles.profileContainer}>
          <div className={styles.profileInfoTop}>
            <div className={styles.profileDiv}>
              <Image
                src={ProfileIcon}
                alt="Profile Icon"
                className={styles.profileIcon}
              />
            </div>
            <div className={styles.textDivision}>
              <span className={styles.name}>Carlos Silva</span>
              <span className={styles.email}>Carlos@gmail.com</span>
            </div>
          </div>
          <div className={styles.contentContainer}>
            <div className={styles.topRow}>
              <div className={styles.title}>Informações Pessoais</div>
              <Icon className={styles.edit} icon="mynaui:edit-one" />
            </div>
            <div className={styles.personalDataContainer}>
              {Object.entries(profileData).map(([key, value]) => (
                <div key={key} className={styles.dataRow}>
                  <div className={styles.label}>
                    {key.charAt(0).toUpperCase() +
                      key
                        .slice(1)
                        .replace(/([A-Z])/g, " $1")
                        .replace("sobrenome", "Sobrenome")
                        .replace("cpf", "CPF")
                        .replace("genero", "Gênero")
                        .replace("dataNascimento", "Data de Nascimento") +
                      ":"}
                  </div>
                  <div className={styles.value}>{value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.contentContainer}>
            <div className={styles.topRow}>
              <div className={styles.title}>Segurança</div>
              <Icon className={styles.edit} icon="mynaui:edit-one" />
            </div>
            <div className={styles.personalDataContainer}>
              {Object.entries(securityData).map(([key, value]) => (
                <div key={key} className={styles.dataRow}>
                  <div className={styles.label}>
                    {key.charAt(0).toUpperCase() +
                      key
                        .slice(1)
                        .replace(/([A-Z])/g, " $1")
                        .replace("telefone", "Telefone")
                        .replace("email", "Email") + ":"}
                  </div>
                  <div className={styles.value}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <RightBoard />
    </div>
  );
}

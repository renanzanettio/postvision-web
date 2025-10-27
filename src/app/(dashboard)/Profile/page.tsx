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

  // FORMATA A DARA PARA O FORMATO BRASILEIRO
  function formatDateToBr(dateInput: string | Date | undefined): string {
    if (!dateInput) return "Informação não encontrada";

    const date =
      typeof dateInput === "string" ? new Date(dateInput) : dateInput;

    if (isNaN(date.getTime())) return "Informação não encontrada";

    return date.toLocaleDateString("pt-BR");
  }

  // FORMATA O CPF PARA O FORMATO XXX.XXX.XXX-XX
  function formatCpf(cpfInput: string | undefined): string {
    if (!cpfInput) return "Informação não encontrada";

    // Remove tudo que não for número
    const onlyDigits = cpfInput.replace(/\D/g, "");

    // Verifica se tem 11 dígitos
    if (onlyDigits.length !== 11) return "CPF inválido";

    // Formata
    return onlyDigits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  // FORMATA O TELEFONE PARA O FORMATO (XX) XXXXX-XXXX OU (XX) XXXX-XXXX
  function formatPhone(phoneInput: string | undefined): string {
    if (!phoneInput) return "Informação não encontrada";

    // Remove tudo que não for número
    const onlyDigits = phoneInput.replace(/\D/g, "");

    // Telefone brasileiro deve ter 10 ou 11 dígitos (DDD + número)
    if (onlyDigits.length === 10) {
      // formato fixo: (XX) XXXX-XXXX
      return onlyDigits.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    } else if (onlyDigits.length === 11) {
      // formato celular: (XX) XXXXX-XXXX
      return onlyDigits.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else {
      return "Telefone inválido";
    }
  }

  const profileData = {
    name: usuario?.nome_usuario || "Informação não encontrada",
    sobrenome: usuario?.sobrenome_usuario || "Informação não encontrada",
    cpf: formatCpf(usuario?.cpf_usuario) || "Informação não encontrada",
    genero: usuario?.genero_usuario || "Informação não encontrada",
    dataNascimento: usuario?.data_nascimento_usuario
  ? formatDateToBr(new Date(new Date(usuario.data_nascimento_usuario).setDate(new Date(usuario.data_nascimento_usuario).getDate() + 1))) : "Informação não encontrada",
  };

  const securityData = {
    telefone: formatPhone(usuario?.telefone_usuario) || "Informação não encontrada",
    email: usuario?.email_usuario || "Informação não encontrada",
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
              <span className={styles.name}>{usuario?.nome_usuario} {usuario?.sobrenome_usuario}</span>
              <span className={styles.email}>{usuario?.email_usuario}</span>
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
                        .replace("email", "Email") +
                      ":"}
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

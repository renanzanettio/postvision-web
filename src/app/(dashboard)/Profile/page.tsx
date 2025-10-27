"use client";
import styles from "./Profile.module.css";
import RightBoard from "../../components/RightBoard/RightBoard";
import ProfileIcon from "@/public/images/profile.svg";
import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useUser } from "../UserContext";

export default function Profile() {
  const usuario = useUser();

  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingSecurity, setIsEditingSecurity] = useState(false);

  // FORMATA A DATA PARA O FORMATO BRASILEIRO E ADICIONA 1 DIA
  function formatDateToBr(dateInput: string | Date | undefined): string {
    if (!dateInput) return "Informação não encontrada";
    const date =
      typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    if (isNaN(date.getTime())) return "Informação não encontrada";
    // Adiciona 1 dia
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay.toLocaleDateString("pt-BR");
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

  const [formData, setFormData] = useState({
    nome_usuario: usuario?.nome_usuario || "",
    sobrenome_usuario: usuario?.sobrenome_usuario || "",
    cpf_usuario: formatCpf(usuario?.cpf_usuario) || "Informação não encontrada",
    genero_usuario: usuario?.genero_usuario || "",
    data_nascimento_usuario: formatDateToBr(usuario?.data_nascimento_usuario),
    telefone_usuario:
      formatPhone(usuario?.telefone_usuario) || "Informação não encontrada",
    email_usuario: usuario?.email_usuario || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (section: "personal" | "security") => {
    if (section === "personal") setIsEditingPersonal(true);
    else setIsEditingSecurity(true);
  };

  const handleCancel = (section: "personal" | "security") => {
    if (section === "personal") setIsEditingPersonal(false);
    else setIsEditingSecurity(false);

    setFormData({
      nome_usuario: usuario?.nome_usuario || "",
      sobrenome_usuario: usuario?.sobrenome_usuario || "",
      cpf_usuario: usuario?.cpf_usuario || "",
      genero_usuario: usuario?.genero_usuario || "",
      data_nascimento_usuario: usuario?.data_nascimento_usuario || "",
      telefone_usuario: usuario?.telefone_usuario || "",
      email_usuario: usuario?.email_usuario || "",
    });
  };

  const handleSave = async (section: "personal" | "security") => {
    try {
      const payload = {
        type: section,
        data:
          section === "personal"
            ? {
                nome_usuario: formData.nome_usuario,
                sobrenome_usuario: formData.sobrenome_usuario,
                cpf_usuario: formData.cpf_usuario,
                genero_usuario: formData.genero_usuario,
                data_nascimento_usuario: formData.data_nascimento_usuario,
              }
            : {
                telefone_usuario: formData.telefone_usuario,
                email_usuario: formData.email_usuario,
              },
      };

      const response = await fetch(`/api/user`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Erro ao atualizar");

      alert("Dados atualizados com sucesso!");
      if (section === "personal") setIsEditingPersonal(false);
      else setIsEditingSecurity(false);
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar alterações.");
    }
  };

  return (
    <div className={styles.reverseContainer}>
      <div className={styles.mainContainer}>
        <div className={styles.profileContainer}>
          {/* Cabeçalho */}
          <div className={styles.profileInfoTop}>
            <div className={styles.profileDiv}>
              <Image
                src={ProfileIcon}
                alt="Profile Icon"
                className={styles.profileIcon}
              />
            </div>
            <div className={styles.textDivision}>
              <span className={styles.name}>
                {usuario?.nome_usuario} {usuario?.sobrenome_usuario}
              </span>
              <span className={styles.email}>{usuario?.email_usuario}</span>
            </div>
          </div>

          {/* Informações Pessoais */}
          <div className={styles.contentContainer}>
            <div className={styles.topRow}>
              <div className={styles.title}>Informações Pessoais</div>
              {!isEditingPersonal && (
                <Icon
                  className={styles.edit}
                  icon="mynaui:edit-one"
                  onClick={() => handleEdit("personal")}
                />
              )}
            </div>

            {!isEditingPersonal ? (
              <div className={styles.personalDataContainer}>
                <div className={styles.dataRow}>
                  <div className={styles.label}>Nome:</div>
                  <div className={styles.value}>{usuario?.nome_usuario}</div>
                </div>
                <div className={styles.dataRow}>
                  <div className={styles.label}>Sobrenome:</div>
                  <div className={styles.value}>
                    {usuario?.sobrenome_usuario}
                  </div>
                </div>
                <div className={styles.dataRow}>
                  <div className={styles.label}>CPF:</div>
                  <div className={styles.value}>{formData.cpf_usuario}</div>
                </div>
                <div className={styles.dataRow}>
                  <div className={styles.label}>Gênero:</div>
                  <div className={styles.value}>{usuario?.genero_usuario}</div>
                </div>
                <div className={styles.dataRow}>
                  <div className={styles.label}>Data de Nascimento:</div>
                  <div className={styles.value}>
                    {formData.data_nascimento_usuario?.split("T")[0]}
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.formEdit}>
                <div className={styles.dataRow}>
                  <div className={styles.label}>Nome:</div>
                  <input
                    name="nome_usuario"
                    value={formData.nome_usuario}
                    onChange={handleChange}
                    placeholder="Nome"
                  />
                </div>
                <div className={styles.dataRow}>
                  <div className={styles.label}>Sobrenome:</div>
                  <input
                    name="sobrenome_usuario"
                    value={formData.sobrenome_usuario}
                    onChange={handleChange}
                    placeholder="Sobrenome"
                  />
                </div>
                <div className={styles.dataRow}>
                  <div className={styles.label}>CPF:</div>
                  <input
                    name="cpf_usuario"
                    value={formData.cpf_usuario}
                    onChange={handleChange}
                    placeholder="CPF"
                  />
                </div>
                <div className={styles.dataRow}>
                  <div className={styles.label}>Gênero:</div>
                  <input
                    name="genero_usuario"
                    value={formData.genero_usuario}
                    onChange={handleChange}
                    placeholder="Gênero"
                  />
                </div>
                <div className={styles.dataRow}>
                  <div className={styles.label}>Data de Nascimento:</div>
                  <input
                    type="date"
                    name="data_nascimento_usuario"
                    value={
                      formData.data_nascimento_usuario?.split("T")[0] || ""
                    }
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.btnRow}>
                  <button onClick={() => handleSave("personal")}>Salvar</button>
                  <button onClick={() => handleCancel("personal")}>
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Segurança */}
          <div className={styles.contentContainer}>
            <div className={styles.topRow}>
              <div className={styles.title}>Segurança</div>
              {!isEditingSecurity && (
                <Icon
                  className={styles.edit}
                  icon="mynaui:edit-one"
                  onClick={() => handleEdit("security")}
                />
              )}
            </div>

            {!isEditingSecurity ? (
              <div className={styles.personalDataContainer}>
                <div className={styles.dataRow}>
                  <div className={styles.label}>Telefone:</div>
                  <div className={styles.value}>
                    {formData.telefone_usuario}
                  </div>
                </div>
                <div className={styles.dataRow}>
                  <div className={styles.label}>Email:</div>
                  <div className={styles.value}>{formData.email_usuario}</div>
                </div>
              </div>
            ) : (
              <div className={styles.formEdit}>
                <input
                  name="telefone_usuario"
                  value={formData.telefone_usuario}
                  onChange={handleChange}
                  placeholder="Telefone"
                />
                <input
                  name="email_usuario"
                  value={formData.email_usuario}
                  onChange={handleChange}
                  placeholder="Email"
                />
                <div className={styles.btnRow}>
                  <button onClick={() => handleSave("security")}>Salvar</button>
                  <button onClick={() => handleCancel("security")}>
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <RightBoard />
    </div>
  );
}

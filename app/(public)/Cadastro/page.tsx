"use client";
import Image from "next/image";
import styles from "./Cadastro.module.css";
import LogoGoogle from "@/public/images/logo-google.svg";
import LogoMicrosoft from "@/public/images/logo-microsoft.svg";
import Graphs1 from "@/public/images/graphs-1.svg";
import Graphs2 from "@/public/images/graphs-2.svg";
import { Icon } from "@iconify/react";
import { useState } from "react";
import Link from "next/link";

export default function Cadastro() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.signUpContainer}>
      {/* Lado esquerdo */}
      <div className={styles.signUpWelcome}>
        <Link
          href="/"
          className={styles.backButton}
          title="Voltar para a página inicial"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
          }}
        >
          <Icon
            icon="mdi:arrow-left"
            width={24}
            height={24}
            className={styles.returnIcon}
          />
          <span>Voltar</span>
        </Link>

        <Image
          alt="Grafos em formato de olho"
          src={Graphs1}
          className={styles.signUpCircles}
        ></Image>
        <Image
          alt="Grafos em formato de olho"
          src={Graphs2}
          className={styles.signUpCirclesBottom}
        ></Image>
        <h1>Seja Bem-Vindo</h1>
        <p>
          PostVision é uma solução inteligente que usa visão computacional para te ajudar a treinar com mais segurança. Corrija sua postura, evite lesões e acompanhe sua evolução com tecnologia a favor da sua saúde.
        </p>
      </div>

      {/* Lado direito */}
      <div className={styles.signUpFormSection}>
        <form className={styles.signUpFormBox}>
          <div className={styles.signUpTitle}>Cadastro</div>
          <div className={styles.signUpRow}>
            <div className={styles.signUpInputGroup}>
              <label htmlFor="nome">Nome</label>
              <input id="nome" type="text" placeholder="Nome" />
            </div>
            <div className={styles.signUpInputGroup}>
              <label htmlFor="sobrenome">Sobrenome</label>
              <input id="sobrenome" type="text" placeholder="Sobrenome" />
            </div>
          </div>

          <div className={styles.signUpRow}>
            <div className={styles.signUpInputGroup}>
              <label htmlFor="nascimento">Data de Nascimento</label>
              <input id="nascimento" type="date" />
            </div>

            <div className={styles.signUpInputGroup}>
              <label htmlFor="genero">Gênero</label>
              <select
                id="genero"
                defaultValue=""
                className={` ${styles.signUpInput} ${styles.signUpSelect}`}
              >
                <option value="" disabled>
                  Selecione
                </option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outros">Outros</option>
              </select>
            </div>

            <div className={styles.signUpInputGroup}>
              <label htmlFor="cpf">CPF</label>
              <input id="cpf" type="text" placeholder="190.203.400-14" />
            </div>
          </div>

          <div className={styles.signUpRow}>
            <div className={styles.signUpInputGroup}>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="email@gmail.com" />
            </div>

            <div className={styles.signUpInputGroup}>
              <label htmlFor="telefone">Telefone</label>
              <input id="telefone" type="text" placeholder="13 997311644" />
            </div>
          </div>

          <div className={styles.signUpInputGroup}>
            <label htmlFor="senha">Senha</label>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                id="senha"
                type={showPassword ? "text" : "password"}
                placeholder="************"
                className={styles.loginInput}
                style={{ width: "100%" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                style={{
                  position: "absolute",
                  right: 16,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
                tabIndex={-1}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  // Olho aberto
                  <Icon icon="mdi:eye-outline" width={24} />
                ) : (
                  // Olho fechado
                  <Icon icon="mdi:eye-off-outline" width={24} />
                )}
              </button>
            </div>
          </div>
          <button type="submit" className={styles.signUpButton}>
            Cadastrar
          </button>
          <div className={styles.signUpAccountLink}>
            Já tem conta?
            <a href="/Entrar">Entrar</a>
          </div>
          <div className={styles.signUpDivider}>Ou</div>
          <div className={styles.signUpSocialButtons}>
            <button type="button" className={styles.signUpSocialBtn}>
              <Image
                src={LogoGoogle}
                alt="Google"
                className={styles.signUpSocialIcon}
              />
              Continuar com o Google
            </button>
            <button type="button" className={styles.signUpSocialBtn}>
              <Image
                src={LogoMicrosoft}
                alt="Microsoft"
                className={styles.signUpSocialIcon}
              />
              Continuar com o Microsoft
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

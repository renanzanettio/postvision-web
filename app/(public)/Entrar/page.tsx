"use client";
import Image from 'next/image';
import styles from './Entrar.module.css';
import Graphs1 from '@/public/images/graphs-1.svg';
import Graphs2 from '@/public/images/graphs-2.svg';
import LogoGoogle from '@/public/images/logo-google.svg';
import LogoMicrosoft from '@/public/images/logo-microsoft.svg';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';

export default function Entrar() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.loginContainer}>
      {/* Lado esquerdo */}
      <div className={styles.loginWelcome}>

        <Link href="/" className={styles.backButton} title="Voltar para a página inicial" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <Icon icon="mdi:arrow-left" width={24} height={24} className={styles.returnIcon} />
          <span>Voltar</span>
        </Link>

        <Image alt='Grafos em formato de olho' src={Graphs1} className={styles.loginCircles} />
        <Image alt='Grafos em formato de olho' src={Graphs2} className={styles.loginCirclesBottom} />
        <h1>Seja Bem-Vindo</h1>
        <p>
          PostVision é uma solução inteligente que usa visão computacional para te ajudar a treinar com mais segurança. Corrija sua postura, evite lesões e acompanhe sua evolução com tecnologia a favor da sua saúde.
        </p>
      </div>

      {/* Lado direito */}
      <div className={styles.loginFormSection}>
        <form className={styles.loginFormBox}>
          <div className={styles.loginTitle}>Entre com a sua conta</div>
          <div className={styles.loginInputGroup}>
            <label htmlFor="cpf">E-mail</label>
            <input id="cpf" type="text" placeholder="email@gmail.com" />
          </div>
          <div className={styles.loginInputGroup}>
            <label htmlFor="senha">Senha</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                id="senha"
                type={showPassword ? "text" : "password"}
                placeholder="************"
                className={styles.loginInput}
                style={{ width: '100%' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                style={{
                  position: 'absolute',
                  right: 16,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%'
                }}
                tabIndex={-1}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  // Olho aberto
                  <Icon icon='mdi:eye-outline' width={24}/>
                ) : (
                  // Olho fechado
                    <Icon icon='mdi:eye-off-outline' width={24}/>
                )}
              </button>
            </div>
          </div>
          <div className={styles.loginAccountLink}>
            Não tem conta? <a href="/Cadastro">Cadastrar</a>
          </div>
          <Link href="/Status"><button type="submit" className={styles.loginButton}>Entrar</button></Link>
          <div className={styles.loginDivider}>Ou</div>
          <div className={styles.loginSocialButtons}>
            <button type="button" className={styles.loginSocialBtn}>
              <Image src={LogoGoogle} alt="Google" className={styles.loginSocialIcon} />
              Continuar com o Google
            </button>
            <button type="button" className={styles.loginSocialBtn}>
              <Image src={LogoMicrosoft} alt="Microsoft" className={styles.loginSocialIcon} />
              Continuar com o Microsoft
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
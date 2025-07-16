import Image from "next/image";
import styles from "./home.module.css";
import Navbar from "./components/Navbar/Navbar";
import MobileHomeScreen from '../public/images/mobile-home-screen.png';
import { Icon } from '@iconify/react';
import LogoMaior from '../public/images/logo-maior.svg';


export default function Home() {
  return (
    <div>
      <Navbar />
      <div className={styles.homeContainer}>
        <div className={styles.textContent}>
          <div className={styles.date}>
            Julho 5, 2025
          </div>
          <div className={styles.title}>
            Melhore sua Postura e Desempenho com Análise Inteligente
          </div>
          <div className={styles.description}>
            Utilizamos visão computacional para avaliar sua postura durante os exercícios, promovendo treinos mais seguros e eficientes.
          </div>
          <div className={styles.homeButtons}>
            <div className={`${styles.button} ${styles.goToPostVision}`}>Ir para PostVision</div>
            <div className={`${styles.button} ${styles.downloadApp}`}>
              Baixar nosso app
              <Icon icon='material-symbols-light:download' width={32} height={32}></Icon> 
            </div>
          </div>
        </div>
        <div className={styles.imageContent}>
          <Image
            src={MobileHomeScreen}
            alt="Tela inicial do aplicativo PostVision"
            className={styles.img}
          />
        </div>
      </div>

      <section className={styles.aboutSection} id="Sobre">
        <h1 className={styles.title}>Sobre o Projeto</h1>
        <div className={styles.aboutContent}>


          <div className={styles.wrapInfosContent}>

            <div className={styles.infoContent}>
              <div className={styles.infoIcon}>
                <Icon icon="tabler:alert-hexagon" className={styles.icon} />
              </div>
              <div className={styles.infoText}>
                Erros na execução de exercícios podem causar sérias lesões. Nosso sistema te auxilia a identificar desvios na postura durante o agachamento.
              </div>
            </div>

            <div className={styles.infoContent}>
              <div className={styles.infoIcon}>
                <Icon icon="hugeicons:workout-gymnastics" className={styles.icon} />
              </div>
              <div className={styles.infoText}>
                Com tecnologia de visão computacional, analisamos os pontos do corpo para avaliar se a postura está correta, garantindo treinos mais seguros e eficazes. 
              </div>
            </div>
            
            <div className={styles.infoContent}>
              <div className={styles.infoIcon}>
                <Icon icon="material-symbols:health-cross-outline-rounded" className={styles.icon} />
              </div>
              <div className={styles.infoText}>
                Nosso foco é ajudar praticantes a manterem uma rotina de exercícios saudável, ajudando a previnir dores e problemas articulares.
              </div>
            </div>

            <div className={styles.infoContent}>
              <div className={styles.infoIcon}>
                <Icon icon="material-symbols:health-cross-outline-rounded" className={styles.icon} />
              </div>
              <div className={styles.infoText}>
                Unimos tecnologia e cuidado com o corpo para tornar a atividade física mais segura, acessível e personalizada, promovendo saúde e qualidade de vida.
              </div>
            </div>

          </div>

          <div className={styles.logo}>
            <Image
              src={LogoMaior}
              alt="PostVision Logo"
              className={styles.logo}
            />
          </div>

        </div>
      </section>
    </div>
  );
}

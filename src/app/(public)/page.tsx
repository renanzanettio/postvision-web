import Image from "next/image";
import styles from "./home.module.css";
import Navbar from "../components/Navbar/Navbar";
import MobileHomeScreen from '@/../public/images/mobile-home-screen.png';
import { Icon } from '@iconify/react';
import LogoMaior from '@/../public/images/logo-maior.svg';
import iconPostvision from '@/../public/images/logo-purple.svg';


export default function Home() {
  return (
    <div className={styles.homePage}>
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
        <div className={styles.aboutContent}>

          <div className={styles.titleContent}>
            <h1 className={styles.title}>Por que usar o PostVision?</h1>
            <hr className={styles.hr} />
          </div>
          <div className={styles.gridAbout}>

            <div className={styles.cardAbout}>
              <div className={styles.icon}>
                <Image src={iconPostvision} alt="icone do PostVision" />
              </div>
              <p className={styles.titleCard}>Correção automática</p>
              <p className={styles.descriptionCard}>Obtenha feedback em tempo real sobre sua postura durante os exercícios.</p>
            </div>

            <div className={styles.cardAbout}>
              <div className={styles.icon}>
                <Icon icon="lucide:brain" width={24} height={24} />
              </div>
              <p className={styles.titleCard}>Feedback inteligente</p>
              <p className={styles.descriptionCard}>Nossa IA entende seus movimentos e entrega orientações práticas..</p>
            </div>

            <div className={styles.cardAbout}>
              <div className={styles.icon}>
                <Icon icon="healthicons:health-outline-24px" width={24} height={24} />
              </div>
              <p className={styles.titleCard}>Mais segurança</p>
              <p className={styles.descriptionCard}>Treine com mais confiança e reduza o risco de lesões por má postura.</p>
            </div>

            <div className={styles.cardAbout}>
              <div className={styles.icon}>
                <Icon icon="gridicons:stats" width={24} height={24} />
              </div>
              <p className={styles.titleCard}>Evolução contínua</p>
              <p className={styles.descriptionCard}>Acompanhe seu progresso ao longo do tempo e supere seus limites.</p>
            </div>


          </div>

          <div className={styles.titleContent}>
            <h1 className={styles.title}>Como funciona?</h1>
            <hr className={styles.hr} />
          </div>

          <div className={styles.gridFluxograma}>

            <div className={styles.cardFluxograma}>
              <div className={styles.counter}>1</div>
              <div className={styles.icon}>
                <Icon icon="line-md:cellphone" width={100} height={100} color="#1b0066" />
              </div>
              <p className={styles.titleCard}>Capture seus exercícios</p>
            </div>

            

            <div className={styles.cardFluxograma}>
              <div className={styles.counter}>2</div>
              <div className={styles.icon}>
                <Icon icon="mingcute:warm-up-2-fill" width={100} height={100} color="#1b0066" />
              </div>
              <p className={styles.titleCard}>Deixe o corpo inteiro visível na câmera.</p>
            </div>

            

            <div className={styles.cardFluxograma}>
              <div className={styles.counter}>3</div>
              <div className={styles.icon}>
                <Icon icon="material-symbols:resume-rounded" width={128} height={128} color="#1b0066" />
              </div>
              <p className={styles.titleCard}>Realize o movimento enquanto gravamos</p>
            </div>

            

            <div className={styles.cardFluxograma}>
              <div className={styles.counter}>4</div>
              <div className={styles.icon}>
                <Icon icon="icon-park-solid:check-one" width={80} height={80} color="#1b0066" />
              </div>
              <p className={styles.titleCard}>Veja sua análise e dicas para melhorar</p>
            </div>


          </div>



        </div>
      </section>
    </div>
  );
}

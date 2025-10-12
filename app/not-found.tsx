import styles from "./not-found.module.css";
import Link from "next/link";


export default function NotFound() {
    return (
        <div className={styles.notFoundContainer}>
            <span className={styles.postvision}>PostVision</span>
            <h1 className={styles.title}>Error 404 - Página Não Encontrada</h1>
            <p className={styles.message}>Desculpe, a página que você está procurando não existe.</p>
            <Link href="/" className={styles.message}>Volte para <span className={styles.link}>Página Inicial</span></Link>
        </div>
    )
}
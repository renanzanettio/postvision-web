"use client";
import styles from './Menu.module.css';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';

export default function Menu() {
    const pathname = usePathname();
    return(
            <div className={styles.menuContainer}>
                <a href="/" className={styles.titleMenu}>PostVision</a>
                <div className={styles.menuLinks}>
                    <a href="/Status" className={`${styles.link} ${pathname === '/Status' ? styles.active : ''}`}>
                    <Icon icon="gridicons:stats" className={styles.statsIcon} />Status
                    </a>
                    <a href="/Profile" className={`${styles.link} ${pathname === '/Profile' ? styles.active : ''}`}>
                    <Icon icon="iconamoon:profile-fill" className={styles.profileIcon}/>Profile
                    </a>
                </div>
                <a href="/Entrar" className={styles.logoutContainer}><Icon icon="ri:logout-box-line" className={styles.logoutButton} /></a>
            </div>
    )
}
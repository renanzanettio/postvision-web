"use client";
import styles from "./AppStatusRow.module.css";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from 'next/navigation';


export default function AppStatusRow() {
  const pathname = usePathname();

  return (
    <div className={styles.appStatusRow}>
      <div className={styles.leftAppStatus}>
        <div className={styles.notificationContainer}>
          <Icon
            icon="mingcute:notification-fill"
            className={styles.notificationIcon}
          />
          <div className={styles.notificationDot}></div>
        </div>
        <Link href="/Settings"><Icon
          icon="material-symbols:settings-rounded"
          className={`${styles.settingsIcon} ${pathname === '/Settings' ? styles.active : ''}`}
        /></Link>
      </div>
      <div className={styles.rightAppStatus}>
        <div className={styles.profileText}>
          <div className={styles.profileName}>Usuário</div>
          <div className={styles.profileStatusContainer}>
            <div className={styles.profileStatus}>On-line</div>
            <div className={styles.profileStatusDot}></div>
          </div>
        </div>
        <div className={styles.profileContainer}>
          <Icon icon="iconamoon:profile-fill" className={styles.profileIcon} />
        </div>
      </div>
    </div>
  );
}

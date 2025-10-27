"use client";
import styles from "./AppStatusRow.module.css";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "../../(dashboard)/UserContext";
import Image from "next/image";
import ProfileIcon from "@/public/images/profile.svg";
import { use, useEffect, useState } from "react";

export default function AppStatusRow() {
  const pathname = usePathname();

  const usuario = useUser();
  let lastName = usuario?.sobrenome_usuario.split(" ").pop();
  if (usuario?.nome_usuario != undefined && lastName != undefined && (usuario?.nome_usuario.length + lastName.length) > 19) {
    lastName = lastName?.charAt(0) + ".";
  }
  const userName = usuario?.nome_usuario + " " + lastName|| "Usuário";

  const [notificationOpen, setNotificationOpen] = useState(false);




  return (
    <div className={styles.appStatusRow}>
      <div className={styles.leftAppStatus}>
        <div className={styles.notificationContainer} onClick={() => setNotificationOpen(!notificationOpen)}>
          <Icon
            icon="mingcute:notification-fill"
            className={styles.notificationIcon}
          />
          <div className={styles.notificationDot}></div>
        </div>
        
        {notificationOpen && (
          <div className={styles.notificationDropdown}>
            <div className={styles.notificationHeader}>Notificações</div>
            <div className={styles.notificationItem}>
              Sua Streak de 24 dias está em perigo! Faça um treino hoje para salvá-la!
            </div>
          </div>
        )}

        <Link href="/Settings">
          <Icon
            icon="material-symbols:settings-rounded"
            className={`${styles.settingsIcon} ${
              pathname === "/Settings" ? styles.active : ""
            }`}
          />
        </Link>
      </div>
      <div className={styles.rightAppStatus}>
        <div className={styles.profileText}>
          <div className={styles.profileName}>{userName}</div>
          <div className={styles.profileStatusContainer}>
            <div className={styles.profileStatus}>On-line</div>
            <div className={styles.profileStatusDot}></div>
          </div>
        </div>
        <div className={styles.profileContainer}>
          <Image src={ProfileIcon} className={styles.profileIcon} alt="imagem de perfil do Usuário"/>
        </div>
      </div>
    </div>
  );
}

import styles from "./AppStatusRow.module.css";
import { Icon } from "@iconify/react";

export default function AppStatusRow() {
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
        <Icon
          icon="material-symbols:settings-rounded"
          className={styles.settingsIcon}
        />
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

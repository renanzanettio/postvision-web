import styles from "./RightBoard.module.css";
import { Icon } from "@iconify/react";
import Menu from "../Menu/Menu";
import StreakCalendar from "../StreakCalendar/SteakCalendar";
import AverageRow from "../AverageRow/AverageRow";
import StreakCounter from "../StreakCounter/StreakCounter";
import AppStatusRow from "../AppStatusRow/AppStatusRow";

export default function RightBoard() {
  return (
    <div className={styles.rightBoard}>

      <AppStatusRow />

      <StreakCounter />

      <AverageRow />

      <StreakCalendar />

    </div>
  );
}

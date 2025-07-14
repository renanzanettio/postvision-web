import Image from 'next/image';
import styles from './Status.module.css';
import { Icon } from '@iconify/react';
import Menu from  "../components/Menu/Menu";
import StreakCalendar from '../components/StreakCalendar/SteakCalendar';
import RightBoard from '../components/RightBoard/RightBoard';

export default function Status() {
    return(
        <div className={styles.statusContainer}>
            <Menu />
            
            <div className={styles.mainContainer}>
                oi
            </div>

            <RightBoard />
        </div>
    )
}
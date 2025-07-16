"use client";
import styles from './StreakCalendar.module.css';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ptBR } from 'date-fns/locale/pt-BR';

const streakDays = [
  // inicia o mês em 0
  new Date(2025, 5, 30),
  new Date(2025, 6, 1),
  new Date(2025, 6, 2),
  new Date(2025, 6, 4),
  new Date(2025, 6, 5),
  new Date(2025, 6, 7),
  new Date(2025, 6, 8),
  new Date(2025, 6, 9),
  new Date(2025, 6, 11),
  new Date(2025, 6, 12),
  new Date(2025, 6, 14),
];

export default function StreakCalendar() {
  const selectedDays = streakDays;

  return (
    <div className={styles.calendarBoard}>
      <div className={styles.calendarContainer}>
        <DayPicker
          locale={ptBR}
          mode="multiple"
          selected={selectedDays}
          disabled={{ before: new Date(2100, 0, 1) }}
          modifiersClassNames={{
            selected: styles.streakDay,
            today: styles.todayDay,
            weekend: styles.weekendDay,
            disabled: styles.disabledDay,
            outside: styles.outsideDay,
          }}
          weekStartsOn={0}
          showOutsideDays
          styles={{
            caption: { background: 'var(--secundary-purple-600)', color: 'var(--white)', borderRadius: '8px', padding: '4px 0', fontWeight: 600, margin: 20, opacity: 0.8},
          }}
        />
      </div>
    </div>
  );
}
"use client";
import styles from "./FilterRow.module.css";
import { Icon } from "@iconify/react";
import { useState } from "react";

export default function FilterRow({selected, setSelected}) {

  const [showFilters, setShowFilters] = useState(true);

  return(
    <div className={styles.filterRow}>
          <div
            className={styles.filterButton}
            onClick={() => setShowFilters((prev) => !prev)}
            style={{ cursor: "pointer" }}
          >
            <Icon icon="ion:filter" className={styles.filterIcon} />
          </div>
          {showFilters && (
            <>
              <label className={`${styles.filterButton} ${ selected === "Todos" ? styles.selectedFilter : "" }`} >
                <input type="radio" name="exercise" value="Todos" checked={selected === "Todos"} onChange={() => setSelected("Todos")} style={{ display: "none" }} />
                Todos
              </label>
              <label className={`${styles.filterButton} ${ selected === "Agachamento" ? styles.selectedFilter : "" }`} >
                <input type="radio" name="exercise" value="Agachamento" checked={selected === "Agachamento"} onChange={() => setSelected("Agachamento")} style={{ display: "none" }}/>
                Agachamento
              </label>
            </>
          )}
        </div>
  )
}
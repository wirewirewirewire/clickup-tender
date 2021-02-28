import React from "react";
import styles from "./styles.module.scss";

export default function Description({ children }) {
  return <div className={styles.description}>{children}</div>;
}

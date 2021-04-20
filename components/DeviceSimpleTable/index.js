import React from "react";
import useFetch from "../../helpers/useFetch";
import Description from "../Description";
import styles from "./styles.module.scss";

export default function Device({ data, id }) {
  const [response, loading, hasError] = useFetch(
    `http://localhost:8002/api/v2/task/${id}`
  );

  console.log("Advance", response);

  if (!data) return null;
  return (
    <tr className={styles.device}>
      <td>{data.name}</td>
    </tr>
  );
}

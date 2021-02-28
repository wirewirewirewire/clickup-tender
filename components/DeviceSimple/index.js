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
    <div className={styles.device}>
      <h5>{data.name}</h5>

      <table className={styles.table}>
        <tr>
          <td>1 Stück</td>
          <td>Angebotenes Fabrikat</td>
          <td>
            {" "}
            <div className={styles.placeholder} />
          </td>
          <td>Preis</td>
          <td>
            <div className={styles.placeholder} />
          </td>
        </tr>
      </table>
    </div>
  );
}

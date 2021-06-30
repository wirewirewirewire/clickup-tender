import React from "react";
import useFetch from "../../helpers/useFetch";
import Description from "../Description";
import styles from "./styles.module.scss";

export default function Device({ data, id, multiple }) {
  const [response, loading, hasError] = useFetch(
    `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v2/task/${id}`
  );

  console.log("Advance", response);

  var a = [];
  if (multiple) {
    try {
      a = JSON.parse(multiple);
    } catch (e) {}
  }

  const result = a.find((e) => e.id === id);
  console.log("result", result, a, multiple);

  if (!data) return null;

  return (
    <li>
      {data.name} ({result ? result?.amount : 1} Stück)
    </li>
  );
  return (
    <div className={styles.device}>
      <h5>{data.name}</h5>

      <table className={styles.table}>
        <tr>
          <td>1 Stück {result?.amount}</td>
          {/*<td>Angebotenes Fabrikat</td>
          <td>
            {" "}
            <div className={styles.placeholder} />
          </td>
          <td>Preis</td>
          <td>
            <div className={styles.placeholder} />
          </td>*/}
        </tr>
      </table>
    </div>
  );
}

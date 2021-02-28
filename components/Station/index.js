import React from "react";
import useFetch from "../../helpers/useFetch";
import Description from "../Description";
import DeviceSimple from "../DeviceSimple";
import styles from "./styles.module.scss";

export default function Device({ data, id, responseDevices }) {
  const [response, loading, hasError] = useFetch(
    `http://localhost:8002/api/v2/task/${id}`
  );

  console.log("Advance", response);

  if (!response) return null;

  const devices = response.custom_fields.find(
    (f) => f.name === "Hardware Geräte"
  );

  const erzaehleinheit = response.custom_fields.find(
    (g) => g.name === "Exponat Erzähleinheit"
  );

  const hardwarePosition = response.custom_fields.find(
    (g) => g.name === "Hardware Anordnung"
  );

  const medienPosition = response.custom_fields.find(
    (g) => g.name === "Medien Position"
  );

  const aufgaben = response.custom_fields.find((g) => g.name === "Aufgaben");

  const lv1 = aufgaben.value.find(
    (g) => g.name === "Erstellung LV Los 1 Part A: Ausstellungswände"
  );

  if (!lv1) return null;

  return (
    <div>
      <h3 className={styles.title}>
        <a href={response.url} target="_blank">
          {erzaehleinheit?.value.name} {response.name}
        </a>
      </h3>
      <div className={styles.subTitle}>
        Position:{" "}
        {medienPosition.type_config.options[medienPosition.value]?.name}
      </div>
      <Description>{response.description}</Description>

      {response.attachments && (
        <div>
          {response.attachments.map((d) => (
            <>
              {d.mimetype.startsWith("image") ? (
                <img src={d.url} key={d.id} className={styles.image} />
              ) : (
                <a></a>
              )}
            </>
          ))}
        </div>
      )}

      <h4>Hardwarepositionierung</h4>
      <p>{hardwarePosition?.value}</p>
      {devices && (
        <div>
          {devices.value.map((d) => (
            <DeviceSimple
              id={d.id}
              data={responseDevices.tasks.find((r) => r.id === d.id)}
              key={d.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

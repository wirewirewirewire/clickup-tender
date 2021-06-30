import React from "react";
import customField from "../../helpers/customField";
import useFetch from "../../helpers/useFetch";
import DescriptionAdvanced from "../DescriptionAdvanced";
import DeviceSimple from "../DeviceSimple";
import styles from "./styles.module.scss";

export default function Station({ data, id, responseDevices, delay }) {
  //'https://app.clickup.com/v1/task/a4qt9e?include_groups=true&fields%5B%5D=content&fields%5B%5D=assignees&fields%5B%5D=dependencies&fields%5B%5D=parent_task&fields%5B%5D=subtask_parent_task&fields%5B%5D=attachments&fields%5B%5D=hidden_attachments&fields%5B%5D=followers&fields%5B%5D=totalTimeSpent&fields%5B%5D=subtasks&fields%5B%5D=todoComments&fields%5B%5D=mentions&fields%5B%5D=tags&fields%5B%5D=position&fields%5B%5D=simple_statuses&fields%5B%5D=viewing&fields%5B%5D=commenting&fields%5B%5D=customFields&fields%5B%5D=statuses&fields%5B%5D=members&fields%5B%5D=features&fields%5B%5D=rolledUpTimeSpent&fields%5B%5D=rolledUpTimeEstimate&fields%5B%5D=rolledUpPointsEstimate&fields%5B%5D=views&fields%5B%5D=linkedTasks&fields%5B%5D=last_viewed&fields%5B%5D=new_thread_count&fields%5B%5D=commit_counts&fields%5B%5D=relationships&markItemViewed=true&include_archived_subtasks=true'

  const taskInclude =
    "?include_groups=true&fields%5B%5D=content&fields%5B%5D=assignees&fields%5B%5D=dependencies&fields%5B%5D=parent_task&fields%5B%5D=subtask_parent_task&fields%5B%5D=attachments&fields%5B%5D=hidden_attachments&fields%5B%5D=followers&fields%5B%5D=totalTimeSpent&fields%5B%5D=subtasks&fields%5B%5D=todoComments&fields%5B%5D=mentions&fields%5B%5D=tags&fields%5B%5D=position&fields%5B%5D=simple_statuses&fields%5B%5D=viewing&fields%5B%5D=commenting&fields%5B%5D=customFields&fields%5B%5D=statuses&fields%5B%5D=members&fields%5B%5D=features&fields%5B%5D=rolledUpTimeSpent&fields%5B%5D=rolledUpTimeEstimate&fields%5B%5D=rolledUpPointsEstimate&fields%5B%5D=views&fields%5B%5D=linkedTasks&fields%5B%5D=last_viewed&fields%5B%5D=new_thread_count&fields%5B%5D=commit_counts&fields%5B%5D=relationships&markItemViewed=true&include_archived_subtasks=true";

  /*const [response, loading, hasError] = useFetch(
    `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v2/task/${id}${taskInclude}`,
    delay
  );*/

  if (!data || !data.custom_fields) return null;
  const devices = customField(data, "Hardware Geräte");
  const erzaehleinheit = customField(data, "Exponat Erzähleinheit");
  const hardwarePosition = customField(data, "Hardware Anordnung");
  const medienPosition = customField(data, "Medien Position");
  const aufgaben = customField(data, "Aufgaben");
  const medienTyp = customField(data, "Medien Typ");
  const anhaenge = customField(data, "Anhänge");
  const multiple = customField(data, "Hardware multiple");

  /*const lv1 = aufgaben.value.find(
    (g) => g.name === "Erstellung LV Los 1 Part A: Ausstellungswände"
  );

  if (!lv1) return null;*/

  return (
    <div>
      <h3 className={styles.title}>
        <a href={data.url} target="_blank">
          {erzaehleinheit?.value.name} {data.name}
        </a>
      </h3>
      <div className={styles.subTitle}>
        Position:{" "}
        {medienPosition.type_config.options[medienPosition.value]?.name} |
        Medientyp: {medienTyp.type_config.options[medienTyp.value]?.name}
      </div>

      <h2>Beschreibung</h2>

      <DescriptionAdvanced id={data.id} delay={delay} />

      {data.attachments && (
        <div>
          {data.attachments.map((d) => (
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

      {customField(data, "Hardware Anmerkungen")?.value && (
        <>
          <h2>Hardware Anmerkungen</h2>
          <p className={styles.longText}>
            {customField(data, "Hardware Anmerkungen")?.value}
          </p>
        </>
      )}

      <h2>Hardwarepositionierung</h2>
      <p className={styles.longText}>{hardwarePosition?.value}</p>

      <h2>Anhänge</h2>
      {anhaenge?.value && (
        <ul>
          {anhaenge.value.map((e) => (
            <li>
              <a href={e.url} target="_blank">
                {e.title}
              </a>
            </li>
          ))}
        </ul>
      )}

      <h2>Geräte</h2>
      {devices && (
        <ul>
          {devices.value.map((d) => (
            <DeviceSimple
              id={d.id}
              data={responseDevices.tasks.find((r) => r.id === d.id)}
              key={d.id}
              multiple={customField(data, "Hardware multiple")?.value}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

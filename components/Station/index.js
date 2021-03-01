import React from "react";
import useFetch from "../../helpers/useFetch";
import DescriptionAdvanced from "../DescriptionAdvanced";
import DeviceSimple from "../DeviceSimple";
import styles from "./styles.module.scss";

export default function Device({ data, id, responseDevices }) {
  //'https://app.clickup.com/v1/task/a4qt9e?include_groups=true&fields%5B%5D=content&fields%5B%5D=assignees&fields%5B%5D=dependencies&fields%5B%5D=parent_task&fields%5B%5D=subtask_parent_task&fields%5B%5D=attachments&fields%5B%5D=hidden_attachments&fields%5B%5D=followers&fields%5B%5D=totalTimeSpent&fields%5B%5D=subtasks&fields%5B%5D=todoComments&fields%5B%5D=mentions&fields%5B%5D=tags&fields%5B%5D=position&fields%5B%5D=simple_statuses&fields%5B%5D=viewing&fields%5B%5D=commenting&fields%5B%5D=customFields&fields%5B%5D=statuses&fields%5B%5D=members&fields%5B%5D=features&fields%5B%5D=rolledUpTimeSpent&fields%5B%5D=rolledUpTimeEstimate&fields%5B%5D=rolledUpPointsEstimate&fields%5B%5D=views&fields%5B%5D=linkedTasks&fields%5B%5D=last_viewed&fields%5B%5D=new_thread_count&fields%5B%5D=commit_counts&fields%5B%5D=relationships&markItemViewed=true&include_archived_subtasks=true'

  const taskInclude =
    "?include_groups=true&fields%5B%5D=content&fields%5B%5D=assignees&fields%5B%5D=dependencies&fields%5B%5D=parent_task&fields%5B%5D=subtask_parent_task&fields%5B%5D=attachments&fields%5B%5D=hidden_attachments&fields%5B%5D=followers&fields%5B%5D=totalTimeSpent&fields%5B%5D=subtasks&fields%5B%5D=todoComments&fields%5B%5D=mentions&fields%5B%5D=tags&fields%5B%5D=position&fields%5B%5D=simple_statuses&fields%5B%5D=viewing&fields%5B%5D=commenting&fields%5B%5D=customFields&fields%5B%5D=statuses&fields%5B%5D=members&fields%5B%5D=features&fields%5B%5D=rolledUpTimeSpent&fields%5B%5D=rolledUpTimeEstimate&fields%5B%5D=rolledUpPointsEstimate&fields%5B%5D=views&fields%5B%5D=linkedTasks&fields%5B%5D=last_viewed&fields%5B%5D=new_thread_count&fields%5B%5D=commit_counts&fields%5B%5D=relationships&markItemViewed=true&include_archived_subtasks=true";

  const [response, loading, hasError] = useFetch(
    `http://localhost:8002/api/v2/task/${id}${taskInclude}`
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

  console.log("response");
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
      <DescriptionAdvanced id={response.id} />

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

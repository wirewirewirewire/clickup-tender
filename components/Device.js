import React from "react";
import customField from "../helpers/customField";
import useFetch from "../helpers/useFetch";
import DescriptionAdvanced from "./DescriptionAdvanced";
import styles from "./Station/styles.module.scss";

export default function Device({ id }) {
  /*const [response, loading, hasError] = useFetch(
    `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v2/task/${id}`
  );*/

  //https://app.clickup.com/v1/task/a4qup7?include_groups=true&fields%5B%5D=content&fields%5B%5D=assignees&fields%5B%5D=dependencies&fields%5B%5D=parent_task&fields%5B%5D=subtask_parent_task&fields%5B%5D=attachments&fields%5B%5D=hidden_attachments&fields%5B%5D=followers&fields%5B%5D=totalTimeSpent&fields%5B%5D=subtasks&fields%5B%5D=todoComments&fields%5B%5D=mentions&fields%5B%5D=tags&fields%5B%5D=position&fields%5B%5D=simple_statuses&fields%5B%5D=viewing&fields%5B%5D=commenting&fields%5B%5D=customFields&fields%5B%5D=statuses&fields%5B%5D=members&fields%5B%5D=features&fields%5B%5D=rolledUpTimeSpent&fields%5B%5D=rolledUpTimeEstimate&fields%5B%5D=rolledUpPointsEstimate&fields%5B%5D=views&fields%5B%5D=linkedTasks&fields%5B%5D=last_viewed&fields%5B%5D=new_thread_count&fields%5B%5D=commit_counts&fields%5B%5D=relationships&markItemViewed=true&include_archived_subtasks=true
  const taskInclude =
    "?include_groups=true&fields%5B%5D=content&fields%5B%5D=assignees&fields%5B%5D=dependencies&fields%5B%5D=parent_task&fields%5B%5D=subtask_parent_task&fields%5B%5D=attachments&fields%5B%5D=hidden_attachments&fields%5B%5D=followers&fields%5B%5D=totalTimeSpent&fields%5B%5D=subtasks&fields%5B%5D=todoComments&fields%5B%5D=mentions&fields%5B%5D=tags&fields%5B%5D=position&fields%5B%5D=simple_statuses&fields%5B%5D=viewing&fields%5B%5D=commenting&fields%5B%5D=customFields&fields%5B%5D=statuses&fields%5B%5D=members&fields%5B%5D=features&fields%5B%5D=rolledUpTimeSpent&fields%5B%5D=rolledUpTimeEstimate&fields%5B%5D=rolledUpPointsEstimate&fields%5B%5D=views&fields%5B%5D=linkedTasks&fields%5B%5D=last_viewed&fields%5B%5D=new_thread_count&fields%5B%5D=commit_counts&fields%5B%5D=relationships&markItemViewed=true&include_archived_subtasks=true";

  const [response, loading, hasError] = useFetch(
    `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v2/task/${id}${taskInclude}`
  );

  if (!response) return <span>loading...</span>;
  return (
    <div>
      <h3 className={styles.title}>
        <a href={response.url} target="_blank">
          {response.name}
          {customField(response, "Beschreibung Generell")?.value}
        </a>
      </h3>

      <h2>Beschreibung</h2>

      <DescriptionAdvanced id={response.id} />

      <h2>Eigenschaften</h2>
      <ul>
        <li>Gewicht: {customField(response, "Gewicht")?.value}</li>
        <li>Größe: {customField(response, "Größe")?.value}</li>
        {customField(response, "Stromversorgung") && (
          <li>
            Stromversorgung: {customField(response, "Stromversorgung")?.value}
          </li>
        )}
        {customField(response, "Projektionsverhältnis (Abstand:Breite)") && (
          <li>
            Projektionsverhältnis (Abstand:Breite):{" "}
            {
              customField(response, "Projektionsverhältnis (Abstand:Breite)")
                ?.value
            }
          </li>
        )}
      </ul>

      <ul>
        {response.customFields &&
          response.customFields.map((cust) => (
            <li>
              {cust.name}: {typeof cust.value === "string" ? cust.value : ""}{" "}
            </li>
          ))}
      </ul>
    </div>
  );
}

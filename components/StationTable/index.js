import React from "react";
import useFetch from "../../helpers/useFetch";
import DescriptionAdvanced from "../DescriptionAdvanced";
import DeviceSimpleTable from "../DeviceSimpleTable";
import styles from "./styles.module.scss";
import customField, { customFieldOptions } from "../../helpers/customField";

export default function Device({ data, id, response, responseDevices }) {
  //'https://app.clickup.com/v1/task/a4qt9e?include_groups=true&fields%5B%5D=content&fields%5B%5D=assignees&fields%5B%5D=dependencies&fields%5B%5D=parent_task&fields%5B%5D=subtask_parent_task&fields%5B%5D=attachments&fields%5B%5D=hidden_attachments&fields%5B%5D=followers&fields%5B%5D=totalTimeSpent&fields%5B%5D=subtasks&fields%5B%5D=todoComments&fields%5B%5D=mentions&fields%5B%5D=tags&fields%5B%5D=position&fields%5B%5D=simple_statuses&fields%5B%5D=viewing&fields%5B%5D=commenting&fields%5B%5D=customFields&fields%5B%5D=statuses&fields%5B%5D=members&fields%5B%5D=features&fields%5B%5D=rolledUpTimeSpent&fields%5B%5D=rolledUpTimeEstimate&fields%5B%5D=rolledUpPointsEstimate&fields%5B%5D=views&fields%5B%5D=linkedTasks&fields%5B%5D=last_viewed&fields%5B%5D=new_thread_count&fields%5B%5D=commit_counts&fields%5B%5D=relationships&markItemViewed=true&include_archived_subtasks=true'

  const taskInclude =
    "?include_groups=true&fields%5B%5D=content&fields%5B%5D=assignees&fields%5B%5D=dependencies&fields%5B%5D=parent_task&fields%5B%5D=subtask_parent_task&fields%5B%5D=attachments&fields%5B%5D=hidden_attachments&fields%5B%5D=followers&fields%5B%5D=totalTimeSpent&fields%5B%5D=subtasks&fields%5B%5D=todoComments&fields%5B%5D=mentions&fields%5B%5D=tags&fields%5B%5D=position&fields%5B%5D=simple_statuses&fields%5B%5D=viewing&fields%5B%5D=commenting&fields%5B%5D=customFields&fields%5B%5D=statuses&fields%5B%5D=members&fields%5B%5D=features&fields%5B%5D=rolledUpTimeSpent&fields%5B%5D=rolledUpTimeEstimate&fields%5B%5D=rolledUpPointsEstimate&fields%5B%5D=views&fields%5B%5D=linkedTasks&fields%5B%5D=last_viewed&fields%5B%5D=new_thread_count&fields%5B%5D=commit_counts&fields%5B%5D=relationships&markItemViewed=true&include_archived_subtasks=true";

  /*const [response, loading, hasError] = useFetch(
    `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v2/task/${id}${taskInclude}`
  );
*/
  if (!response) return null;

  const devices = response.custom_fields.find(
    (f) => f.name === "Hardware Geräte"
  );

  return (
    <>
      <tr>
        <td>
          <a href={response.url} target="_blank">
            {response.name}
          </a>
        </td>

        <td>{customFieldOptions(response, "Medien Position")?.name}</td>
        <td className={styles.cellNumber}>
          {customFieldOptions(response, "Medien Typ")?.name}
        </td>

        <td className={styles.cellNumber}>
          {customField(response, "LAN (PoE) Boden").value}
        </td>
        <td className={styles.cellNumber}>
          {customField(response, "LAN (PoE) Decke").value}
        </td>
        <td className={styles.cellNumber}>
          {customField(response, "LAN (PoE) Wand").value}
        </td>

        <td className={styles.cellNumber}>
          {customField(response, "Strom Boden").value}
        </td>
        <td className={styles.cellNumber}>
          {customField(response, "Strom Decke").value}
        </td>
        <td className={styles.cellNumber}>
          {customField(response, "Strom Wand").value}
        </td>
        <td className={styles.cellNumber}>
          {customField(response, "Strom Leistung").value}W
        </td>
      </tr>
    </>
  );
}

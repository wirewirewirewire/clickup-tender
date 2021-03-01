import React from "react";
import useFetch from "../../helpers/useFetch";
import styles from "./styles.module.scss";

function Header({ e, next }) {
  const CustomTag = `h${next?.attributes?.header}`;
  return <CustomTag>{e.insert}</CustomTag>;
}

function List({ e, next }) {
  const CustomTag = `li`;
  return <CustomTag>{e.insert}</CustomTag>;
}

export default function DescriptionAdvanced({ children, id }) {
  const taskInclude =
    "?include_groups=true&fields%5B%5D=content&fields%5B%5D=assignees&fields%5B%5D=dependencies&fields%5B%5D=parent_task&fields%5B%5D=subtask_parent_task&fields%5B%5D=attachments&fields%5B%5D=hidden_attachments&fields%5B%5D=followers&fields%5B%5D=totalTimeSpent&fields%5B%5D=subtasks&fields%5B%5D=todoComments&fields%5B%5D=mentions&fields%5B%5D=tags&fields%5B%5D=position&fields%5B%5D=simple_statuses&fields%5B%5D=viewing&fields%5B%5D=commenting&fields%5B%5D=customFields&fields%5B%5D=statuses&fields%5B%5D=members&fields%5B%5D=features&fields%5B%5D=rolledUpTimeSpent&fields%5B%5D=rolledUpTimeEstimate&fields%5B%5D=rolledUpPointsEstimate&fields%5B%5D=views&fields%5B%5D=linkedTasks&fields%5B%5D=last_viewed&fields%5B%5D=new_thread_count&fields%5B%5D=commit_counts&fields%5B%5D=relationships&markItemViewed=true&include_archived_subtasks=true";

  const [responseAdvanced, loadingAdvanced, hasErrorAdvanced] = useFetch(
    `http://localhost:8002/v1/task/${id}${taskInclude}`
  );

  if (!responseAdvanced) return <span>Loading {id}</span>;
  console.log("responseAdvanced", responseAdvanced);

  const content = JSON.parse(responseAdvanced.content);

  return (
    <div className={styles.description}>
      {content.ops.map((e, i) => {
        const next = content.ops[i + 1];
        if (next?.attributes?.header)
          return <Header key={i} e={e} next={next} />;
        if (next?.attributes?.list) return <List key={i} e={e} next={next} />;
        if (e?.attributes?.list) return null;
        return <span key={i}>{e.insert}</span>;
      })}
    </div>
  );
}

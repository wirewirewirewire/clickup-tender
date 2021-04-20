import React from "react";
import useFetch from "../../helpers/useFetch";
import styles from "./styles.module.scss";

function String({ children }) {
  if (typeof children === "string") return children;
  return JSON.stringify(children);
}
function Header({ e, next }) {
  const CustomTag = next?.attributes?.header
    ? `h${next?.attributes?.header}`
    : next?.attributes?.list
    ? "li"
    : "span";

  return (
    <CustomTag style={{ fontWeight: e?.attributes?.bold ? "bold" : undefined }}>
      <String>{e.insert}</String>
    </CustomTag>
  );
}

function List({ e, next }) {
  const CustomTag = `li`;
  return (
    <CustomTag>
      {" "}
      <String>{e.insert}</String>
    </CustomTag>
  );
}

function Image({ e, next }) {
  return <img src={e.insert.image} className={styles.image} />;
}

export default function DescriptionAdvanced({ id, delay }) {
  const taskInclude =
    "?include_groups=true&fields%5B%5D=content&fields%5B%5D=assignees&fields%5B%5D=dependencies&fields%5B%5D=parent_task&fields%5B%5D=subtask_parent_task&fields%5B%5D=attachments&fields%5B%5D=hidden_attachments&fields%5B%5D=followers&fields%5B%5D=totalTimeSpent&fields%5B%5D=subtasks&fields%5B%5D=todoComments&fields%5B%5D=mentions&fields%5B%5D=tags&fields%5B%5D=position&fields%5B%5D=simple_statuses&fields%5B%5D=viewing&fields%5B%5D=commenting&fields%5B%5D=customFields&fields%5B%5D=statuses&fields%5B%5D=members&fields%5B%5D=features&fields%5B%5D=rolledUpTimeSpent&fields%5B%5D=rolledUpTimeEstimate&fields%5B%5D=rolledUpPointsEstimate&fields%5B%5D=views&fields%5B%5D=linkedTasks&fields%5B%5D=last_viewed&fields%5B%5D=new_thread_count&fields%5B%5D=commit_counts&fields%5B%5D=relationships&markItemViewed=true&include_archived_subtasks=true";

  const [responseAdvanced, loadingAdvanced, hasErrorAdvanced] = useFetch(
    `http://localhost:8002/v1/task/${id}${taskInclude}`,
    delay
  );
  x;

  if (!responseAdvanced?.content)
    return (
      <span className={styles.loading}>Loading DescriptionAdvanced {id}</span>
    );

  const content = JSON.parse(responseAdvanced.content);
  if (!content) return null;

  return (
    <div className={styles.description}>
      {content.ops.map((e, i) => {
        const next = content.ops[i + 1];
        console.log("e.insert", e);
        if (e?.insert?.image) return <Image key={i} e={e} next={next} />;
        if (next?.attributes) return <Header key={i} e={e} next={next} />;
        if (next?.attributes?.list) return <List key={i} e={e} next={next} />;
        if (e?.attributes?.list) return null;
        return (
          <span key={i}>
            <String>{e.insert}</String>
          </span>
        );
      })}
    </div>
  );
}

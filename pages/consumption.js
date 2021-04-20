import axios from "axios";
import Head from "next/head";
import { useState, useEffect } from "react";
import Tender from "../components/Tender";
import DeviceSimple from "../components/DeviceSimple";
import Device from "../components/Device";
import useFetch from "../helpers/useFetch";
import Description from "../components/Description";
import StationTable from "../components/StationTable";

import styles from "./consumption.module.scss";
import useFilter from "../helpers/useFilter";
import useGroup from "../helpers/useGroup";
import calcTotal from "../helpers/calcTotal";
import customField from "../helpers/customField";

const taskInclude =
  "?include_groups=true&fields%5B%5D=content&fields%5B%5D=assignees&fields%5B%5D=dependencies&fields%5B%5D=parent_task&fields%5B%5D=subtask_parent_task&fields%5B%5D=attachments&fields%5B%5D=hidden_attachments&fields%5B%5D=followers&fields%5B%5D=totalTimeSpent&fields%5B%5D=subtasks&fields%5B%5D=todoComments&fields%5B%5D=mentions&fields%5B%5D=tags&fields%5B%5D=position&fields%5B%5D=simple_statuses&fields%5B%5D=viewing&fields%5B%5D=commenting&fields%5B%5D=customFields&fields%5B%5D=statuses&fields%5B%5D=members&fields%5B%5D=features&fields%5B%5D=rolledUpTimeSpent&fields%5B%5D=rolledUpTimeEstimate&fields%5B%5D=rolledUpPointsEstimate&fields%5B%5D=views&fields%5B%5D=linkedTasks&fields%5B%5D=last_viewed&fields%5B%5D=new_thread_count&fields%5B%5D=commit_counts&fields%5B%5D=relationships&markItemViewed=true&include_archived_subtasks=true";
export default function Home({ posts }) {
  const token = "pk_2586274_TSD0SI9R593QKEYH7V1MDHN5GJ02WWLW";

  const [response, loading, hasError] = useFetch(
    "http://localhost:8002/api/v2/list/34161430/task"
  );

  const [responseDevices, loadingDevices, hasErrorDevices] = useFetch(
    `http://localhost:8002/api/v2/list/34161439/task${taskInclude}`
  );

  const responseSort = (a, b) => {
    return customField(a, "Exponat Erzähleinheit")?.value[0]?.name >
      customField(b, "Exponat Erzähleinheit")?.value[0]?.name
      ? 1
      : -1;
  };

  const { responseTasks, responseDevicesFiltered } = useFilter({
    response,
    responseDevices,
    responseFilter: false,
    responseSort,
  });

  const data = useGroup({
    response,
  });

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : hasError ? (
        <div>Error occured.</div>
      ) : (
        <>
          <div className={styles.page}>
            {response && response.tasks && responseDevices && (
              <table className={styles.consumptionTable}>
                <thead>
                  <tr>
                    <td></td>
                    <td>Position</td>
                    <td>Medien Position</td>
                    <td>LAN (PoE) Boden</td>
                    <td>LAN (PoE) Decke</td>
                    <td>LAN (PoE) Wand</td>
                    <td>Strom Boden</td>
                    <td>Strom Decke</td>
                    <td>Strom Leistung</td>
                    <td>Strom Wand</td>
                  </tr>
                </thead>

                {Object.values(data).map((f) => (
                  <tbody>
                    <tr>
                      <td colSpan={10}>
                        <h5>
                          {f.field?.name ? f.field?.name : "ohne Erzähleinheit"}
                        </h5>
                      </td>
                    </tr>
                    {f.entries.map((e) => {
                      return (
                        <StationTable
                          id={e.id}
                          response={response.tasks.find((r) => r.id === e)}
                          responseDevices={responseDevices}
                        />
                      );
                    })}
                  </tbody>
                ))}
                <tbody className={styles.totals}>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>

                    <td className={styles.cellNumber}>
                      {calcTotal(response.tasks, "LAN (PoE) Boden")}
                    </td>
                    <td className={styles.cellNumber}>
                      {calcTotal(response.tasks, "LAN (PoE) Decke")}
                    </td>
                    <td className={styles.cellNumber}>
                      {calcTotal(response.tasks, "LAN (PoE) Wand")}
                    </td>
                    <td className={styles.cellNumber}>
                      {calcTotal(response.tasks, "Strom Boden")}
                    </td>
                    <td className={styles.cellNumber}>
                      {calcTotal(response.tasks, "Strom Decke")}
                    </td>
                    <td className={styles.cellNumber}>
                      {calcTotal(response.tasks, "Strom Leistung")}W
                    </td>
                    <td className={styles.cellNumber}>
                      {calcTotal(response.tasks, "Strom Wand")}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  const token = "pk_2586274_TSD0SI9R593QKEYH7V1MDHN5GJ02WWLW";
  //const res = await fetch("https://api.clickup.com/api/v2/list/list_id");

  const res = await fetch(
    "http://localhost:8002/api/v2/team", // "http://localhost:8002/api/v2/team/2412343/space?archived=false",
    {
      method: "get",
      headers: new Headers({
        Authorization: `${token}`,
      }),
    }
  );

  const posts = await res.json();

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
    revalidate: 1,
  };
}

import React, { useState } from "react";
import customField from "./customField";

export default function useFilter({
  response,
  responseDevices,
  responseFilter,
  responseSort,
}) {
  const [filter, setFilter] = useState(false);

  var responseFilteredTasks =
    response?.tasks && responseFilter
      ? response.tasks.filter((e) => {
          if (responseFilter) {
            const aufgaben = e.custom_fields.find((g) => g.name === "Aufgaben");

            const lv1 = aufgaben.value.find(
              (g) => g.name === "Erstellung LV Los 1 Part A: Ausstellungswände"
            );

            if (!lv1) return false;
          }
          return true;
        })
      : response?.tasks;

  if (responseFilteredTasks)
    responseFilteredTasks = responseFilteredTasks.sort((a, b) => {
      if (responseSort) {
        return responseSort(a, b);
      }
      console.log(
        "filter",
        a.name,
        b.name
        /*  customField(a, "Exponat Erzähleinheit")?.value[0].name,
        customField(b, "Exponat Erzähleinheit")?.value[0].name*/
      );
      /*return customField(a, "Exponat Erzähleinheit")?.value[0]?.name >
        customField(b, "Exponat Erzähleinheit")?.value[0]?.name
        ? 1
        : -1;*/
      return a.name > b.name ? 1 : -1;
    });

  console.log("responseFilteredTasks", responseFilteredTasks);

  return { responseTasks: responseFilteredTasks, responseDevices };
}

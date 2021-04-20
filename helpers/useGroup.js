import React from "react";
import customField from "./customField";

export default function useGroup({ response }) {
  var data = {};
  if (response) {
    console.log("response", response.tasks);

    const groups = response.tasks.map((e) => {
      console.log(customField(e, "Exponat Erzähleinheit"));
      const field = customField(e, "Exponat Erzähleinheit")?.value[0];
      const id = field?.id ? field.id : "no-ee";
      if (data[id]) {
        data[id].entries.push(e.id);
      } else {
        data[id] = { field, entries: [e.id] };
      }
    });
    data = Object.values(data).sort((a, b) =>
      a.field?.name > b.field?.name ? 1 : -1
    );
    console.log(data);
  }

  return data;
}

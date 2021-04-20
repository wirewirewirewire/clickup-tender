import React from "react";
import customField from "./customField";

export default function calcTotal(tasks, search) {
  var total = 0;

  tasks.map((e) => {
    console.log("total", customField(e, "LAN (PoE) Decke").value);
    const value = parseInt(customField(e, search).value);
    if (!isNaN(value)) total = total + value;
  });

  return total;
}

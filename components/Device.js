import React from "react";
import useFetch from "../helpers/useFetch";
import Description from "./Description";

export default function Device({ data, id }) {
  /*const [response, loading, hasError] = useFetch(
    `http://localhost:8002/api/v2/task/${id}`
  );*/

  const [response, loading, hasError] = useFetch(
    `http://localhost:8002/api/v2/task/${id}`
  );

  if (!response) return null;
  return (
    <div>
      <h5>{response.name}</h5>
      <Description>{response.description}</Description>

      <ul>
        {response.custom_fields.map((cust) => (
          <li>
            {cust.name}: {typeof cust.value === "string" ? cust.value : ""}{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}

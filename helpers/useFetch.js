import axios from "axios";
import Head from "next/head";
import { useState, useEffect } from "react";
import Tender from "../components/Tender";
import Device from "../components/Device";

export default function useFetch(url, opts) {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    const token = "pk_2586274_TSD0SI9R593QKEYH7V1MDHN5GJ02WWLW";
    setLoading(true);

    axios
      .get(url)
      .then(function (response) {
        setResponse(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setHasError(true);
        setLoading(false);
      });
  }, [url]);
  return [response, loading, hasError];
}

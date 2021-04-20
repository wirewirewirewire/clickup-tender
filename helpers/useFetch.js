import axios from "axios";
import Head from "next/head";
import { useState, useEffect } from "react";
import Tender from "../components/Tender";
import Device from "../components/Device";

export default function useFetch(url, opts = 0) {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
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
    }, opts);
  }, [url]);
  return [response, loading, hasError];
}

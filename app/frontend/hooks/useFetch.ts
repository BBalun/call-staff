import React from "react";

export function useFetch<Response = any>(url: RequestInfo, options?: RequestInit) {
  const [response, setResponse] = React.useState<Response>(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(json);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  return { response, error, isLoading };
}

// source: https://www.digitalocean.com/community/tutorials/creating-a-custom-usefetch-react-hook

import { useState } from 'react';

export const fetcher = url => 
  fetch(url).then(async r => {
    const result = await r.json();
    if (r.status !== 200) {
      return Promise.reject(result);
    } else {
      return  result;
    }
  });

export function useApiHandler(apiCall) {
  const [reqState, setReqState] = useState({
    error: null,
    data: null,
    loading: false
  }) 

  const handler = async (...data) => {
    setReqState({error: null, data: null, loading: true});
    try {
      const json = await apiCall(...data);
      setReqState({error: null, data: json.data, loading: false});
      return json.data;
    } catch(e) {
      const message = (e.response && e.response.data) || 'Ooops, something went wrong...';
      setReqState({error: message, data: null, loading: false});
      return Promise.reject(message);
    }
  }

  return [handler, {...reqState}]
}
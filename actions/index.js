import useSWR from 'swr';
//import { useEffect, useState } from 'react';

const fetcher = url => 
  fetch(url).then(async r => {
    const result = await r.json();
    if (r.status !== 200) {
      return Promise.reject(result);
    } else {
      return  result;
    }
  });

export const useGetPosts = () => {
  const {data, error, ...rest} = useSWR('/api/v1/posts', fetcher);
  return {data, error, loading: !data && !error, ...rest};
};

export const useGetPostById = (id) => {
  const {data, error, ...rest} = useSWR(id ? `/api/v1/posts/${id}` : null, fetcher);
  return {data, error, loading: !data && !error, ...rest};
};

//export const useGetData = (url) => {
//  const [data, setData] = useState();
//  const [error, setError] = useState();
//  const [loading, setLoading] = useState(true);
//
//  useEffect(() => {
//    async function fetchData() {
//      const res = await fetch(url);
//      const result = await res.json();
//
//      if (res.status !== 200) {
//        setError(result);    
//      } else {
//        setData(result);
//      }
//
//      setLoading(false);
//    }
//
//    url && fetchData();
//  }, [url]);
//  return {data, error, loading};
//}
//
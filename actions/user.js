//import useSWR from 'swr';
//import { fetcher } from '@/actions';
import { useEffect, useState } from 'react';

export const useGetUser = () => {
  //const { data, error, ...rest} = useSWR('/api/auth/me', fetcher);
  //return { data, error, loading: !data && !error, ...rest};
  const [user, setUser ] = useState();
  const [error, setError ] = useState();
  const [loading, setLoading ] = useState(true);

  useEffect(() => {
    async function getUser() {
      const res = await fetch('/api/auth/me');
      const result = await res.json();
      if (res.status !== 200) {
        setError(result)
      } else {
        setUser(result);
      }

      setLoading(false);
    }

    getUser();
  }, []);

  return { user, error, loading };
};
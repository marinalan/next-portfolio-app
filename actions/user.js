import { useUser } from '@auth0/nextjs-auth0';
import useSWR from 'swr';
import { fetcher } from '@/actions';

export const useGetUser = () => {
  // const { data, error, ...rest} = useSWR('/api/v1/me', fetcher);
  // return { data, error, loading: !data && !error, ...rest};
  const { data, error, isLoading } = useUser();
  debugger;
  return { data, error, isLoading };
};
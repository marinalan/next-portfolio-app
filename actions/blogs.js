import axios from 'axios';
import useSWR from 'swr';
import { fetcher, useApiHandler } from '@/actions';

const createBlog = data => axios.post('/api/v1/blogs', data);
const updateBlog = (id, data) => axios.patch(`/api/v1/blogs/${id}`, data);
// const deleteBlog = (id) => axios.delete(`/api/v1/blogs/${id}`);

export const useCreateBlog = () => useApiHandler(createBlog);
export const useUpdateBlog = () => useApiHandler(updateBlog);
// export const useDeleteBlog = () => useApiHandler(deleteBlog);
// 
export const useGetBlog = (id) => {
  const { data, error, ...rest} = useSWR(id ? `/api/v1/blogs/${id}` : null, fetcher);
  return { data, error, loading: !data && !error, ...rest};
}

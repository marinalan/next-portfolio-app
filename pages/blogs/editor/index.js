import { useRouter } from 'next/router';
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import withAuth from '@/hoc/withAuth';
import Editor from '@/lib/editor'
import { useCreateBlog } from '@/actions/blogs';
import { toast } from 'react-toastify';

const BlogEditor = ({user, loading}) => {
	const router = useRouter();
  const [createBlog, {data: createdBlog, error, loading: blogLoading}] = useCreateBlog();

  const saveBlog = async data => {
    const createdBlog = await createBlog(data);
    //toast.success('Blog has been updated!', { autoClose: 2000 });
		router.push('/blogs/editor/[id]', `/blogs/editor/${createdBlog._id}`)
  };

  if (error) {
    toast.error(error);		  
  }

  return (
    <BaseLayout
      user={user}
      loading={loading}
    >
      <BasePage>
        <Editor 
					onSave={saveBlog}
					loading={blogLoading}
			  />
      </BasePage>
    </BaseLayout>
  )
}

export default withAuth(BlogEditor)('admin');

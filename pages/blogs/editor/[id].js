import { useRouter } from 'next/router';
import { Row, Col } from 'reactstrap';
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import withAuth from '@/hoc/withAuth';
import Editor from '@/lib/editor'
import { 
	useGetBlog,
	useUpdateBlog 
} from '@/actions/blogs';
import { toast } from 'react-toastify';

const BlogUpdateEditor = ({user, loading}) => {
  const router = useRouter();
  const { data } = useGetBlog(router.query.id);
  const [ updateBlog, {error, loading: isBlogSaving} ] = useUpdateBlog();

	const _updateBlog = async data => {
		await updateBlog(router.query.id, data);
    toast.success('Blog updated!', { autoClose: 2000 });
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
			{ data && data.content &&
				<Row>
					<Col md={{size: 8, offset: 2}}>
						<Editor 
							header="Update Your Blog..."
							initialContent={data.content}
							onSave={_updateBlog}
							loading={isBlogSaving}
						/>
					</Col>
				</Row>
			}
      </BasePage>
    </BaseLayout>
  )
}

export default withAuth(BlogUpdateEditor)('admin');

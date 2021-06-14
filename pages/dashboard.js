import Link from 'next/link';
import { Row, Col } from 'reactstrap';
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
//import withAuth from '@/hoc/withAuth';
import auth0 from '@/utils/auth0'
import { withAuth } from '@/utils/auth0';
import { useUpdateBlog } from '@/actions/blogs';
import BlogApi from '@/lib/api/blogs';
import Masthead from '@/components/shared/Masthead';
import PortButtonDropdown from '@/components/shared/Dropdown';

const Dashboard = ({user, blogs}) => {
  const [ updateBlog, {error, loading: isBlogSaving} ] = useUpdateBlog();

	const changeBlogStatus = async (blogId, status) => {
		await updateBlog(blogId, {status});
	}
	
	const createOption = (blogStatus) => {
		return blogStatus === 'draft' ? {view: 'Publish Story', value: 'published'}
		                              : {view: 'Make a Draft', value: 'draft'};
	}

	const createOptions = (blog) => {
	  const option = createOption(blog.status);
		return [
			{
				key: `${blog._id}-published`, 
				text: option.view, 
				handlers: { 
					onClick: () => changeBlogStatus(blog._id, option.value)
				}
			},
			{key: `${blog._id}-delete`, text: 'Delete', handlers: { onClick: () => {alert('Clicking Delete!')}}}
		]
	};

	const renderBlogs = (blogs, status) => (
		<ul className="user-blogs-list">
      {
		    blogs.filter(blog => blog.status === status).map(blog => 
					<li key={blog._id}>
						<Link href="/blogs/editor/[id]" as={`/blogs/editor/${blog._id}`}>
							<a>{blog.title}</a>
						</Link>
						<PortButtonDropdown items={createOptions(blog)}/>
					</li>
				)
	    }
		</ul>
	);

  return (
    <BaseLayout navClass="transparent" user={user} loading={false}>
			<Masthead imagePath="/images/home-bg.jpg" />
      <BasePage className="blog-user-page">
        <Row>
          <Col md="6" className="mx-auto text-center">
            <h2 className="blog-status-title"> Published Blogs </h2>
						{ renderBlogs(blogs, 'published') }
          </Col>
          <Col md="6" className="mx-auto text-center">
            <h2 className="blog-status-title"> Draft Blogs </h2>
						{ renderBlogs(blogs, 'draft') }
          </Col>
        </Row> 
      </BasePage>
    </BaseLayout>
  )
}

export const getServerSideProps = withAuth(async ({req, res}) => {
	const { accessToken } = await auth0.getSession(req, res);
	const json = await new BlogApi(accessToken).getByUser();
	return { blogs: json.data };
})('admin');

export default Dashboard;
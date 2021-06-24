import { useUser } from '@auth0/nextjs-auth0';
import { Row, Col } from 'reactstrap';
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import BlogApi from '@/lib/api/blogs';
import SlateView from '@/lib/editor/ReadOnly';
import Avatar from '@/components/shared/Avatar';

const BlogDetail = ({blog, author}) => {
  const { user, isLoading } = useUser();
  return (
    <BaseLayout
      user={user}
      loading={isLoading}
    >
      <BasePage
				title={`${blog.title}`} 
				className="slate-container"
				metaDescription={blog.subTitle?.substr(0, 150)}
			>
        <Row>
					<Col md={{size: 8, offset: 2}}>
						<Avatar 
						  image={author.picture}
							title={author.name}
							date={blog.createdAt}
						/>
						<hr/>
						<SlateView initialContent={blog.content}/>
					</Col>
				</Row>
      </BasePage>
    </BaseLayout>
  )
}

export async function getStaticPaths() {
	const { data } = await new BlogApi().getAll();
	const paths = data.map(({blog}) => ({ params: {slug: blog.slug} }));
	return { paths, fallback: false };
}

export async function getStaticProps({params}) {
	const { data: {blog, author}} = await new BlogApi().getBySlug(params.slug);
	return {props: {blog, author}};
}

export default BlogDetail;

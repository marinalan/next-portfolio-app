import Link from 'next/link';
import moment from 'moment';

const BlogItem = ({blog}) => 
	<div className="post-preview clickable">
		<Link href="/blogs/[slug]" as={`/blogs/${blog.slug}`}>
			<a>
				<h2 className="post-title">
					{blog.title}
				</h2>
				<h3 className="post-subtitle">
					{blog.subTitle}
				</h3>
			</a>
		</Link>
		<p className="post-meta">Posted by
			<a href="#"> Filip Jerga </a>
			- {moment(blog.createdAt).format('LLLL')}
		</p>
	</div>

export default BlogItem;
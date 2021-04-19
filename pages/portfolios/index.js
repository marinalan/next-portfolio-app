import Link from "next/link";
import { ListGroup, ListGroupItem } from 'reactstrap';
import { useUser } from '@auth0/nextjs-auth0';
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { useGetPosts } from '@/actions';

const renderPosts = posts =>{
  return posts.map(
    post => (
      <ListGroupItem key={post.id}>
        <Link href={`/portfolios/${post.id}`}>
          <a>
            {post.title}
          </a>
        </Link>
      </ListGroupItem>
    )
  )
}

const Portfolios = () => { 
  const { data, error, loading } = useGetPosts();
  const { user, isLoading } = useUser();

  return (
    <BaseLayout
      user={user}
      loading={isLoading}
    >
      <BasePage>
        <h1>Portfolios</h1>
        { loading &&
          <p>Loading data...</p>
        }
        {
          data && 
          <ListGroup>
            { renderPosts(data) }
          </ListGroup>
        }
        { error && 
          <div className="alert alert-danger">{error.message}</div>
        }
      </BasePage>
    </BaseLayout>
  );
};

export default Portfolios;
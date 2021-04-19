import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { useGetPostById } from '@/actions';

const Portfolio = () => {
  const router = useRouter();
  const { data: portfolio, error, loading } = useGetPostById(router.query.id);
  const { user, isLoading } = useUser();

  return (
    <BaseLayout
      user={user}
      loading={isLoading}
    >
      <BasePage>
        { loading && <p>Loading data...</p> }
        { error && <div className="alert alert-danger">{error.message}</div> }
        { portfolio && 
          <>
            <h1>{portfolio.title}</h1>
            <p>BODY: {portfolio.body}</p>
            <p>ID: {portfolio.id}</p>
          </>
        }
      </BasePage>
    </BaseLayout>
  )
};
export default Portfolio;
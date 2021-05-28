import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import PortfolioApi from '@/lib/api/portfolios';

const Portfolio = ({portfolio}) => {
  const router = useRouter();
  const { user, isLoading } = useUser();

  return (
    <BaseLayout
      user={user}
      loading={isLoading}
    >
      <BasePage header="Portfolio Detail">
        {
          JSON.stringify(portfolio)
        }
      </BasePage>
    </BaseLayout>
  )
};

export async function getServerSideProps({query}) {
  const json = await new PortfolioApi().getById(query.id);
  const portfolio = json.data;
  return {
    props: { portfolio }
  }
}

// // This functions is executed at the build time
// export async function getStaticPaths() {
//   const json = await new PortfolioApi().getAll();
//   const portfolios = json.data;
// 
//   // Get the paths we want pre-render based on portfolio ID
//   const paths = portfolios.map(portfolio => {
//     return {
//       params: {id: portfolio._id}
//     }
//   })
// 
//   // false means that "not found pages" will be resolved into 404 page
//   return { paths, fallback: false };
// }

// export async function getStaticProps({params}) {
// 
//   const json = await new PortfolioApi().getById(params.id);
//   const portfolio = json.data;
//   return { props: { portfolio }}
// }

export default Portfolio;
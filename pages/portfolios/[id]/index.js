import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import PortfolioApi from '@/lib/api/portfolios';
import { formatDate } from'@/helpers/functions';

const Portfolio = ({portfolio}) => {
  const { user, isLoading } = useUser();
	const router = useRouter();

	if (router.isFallback) {
		return <h1>Your page is getting server</h1>
	}

  return (
    <BaseLayout
      user={user}
      loading={isLoading}
			navClass="transparent"
    >
      <BasePage 
			  noWrapper
			  indexPage
				title={`${portfolio.title}`}
				metaDescription={portfolio.description.substr(0, 150)}
			>
        <div className="portfolio-detail">
					<div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
						<main role="main" className="inner page-cover">
							{ router.isFallback &&
								<h1 className="cover-heading">Your page is getting server...</h1>
							}
							{ !router.isFallback &&
								<>
									<h1 className="cover-heading">{portfolio.title}</h1>
									<p className="lead dates">{formatDate(portfolio.startDate)}-{formatDate(portfolio.endDate) || 'Present'}</p>
									<p className="lead info mb-0">{portfolio.jobTitle} | {portfolio.company} | {portfolio.location}</p>
									<p className="lead">{portfolio.description}</p>
									<p className="lead">
										<a href={portfolio.companyWebsite} target="_blank" className="btn btn-lg btn-secondary">Visit Company</a>
									</p>
								</>
							}
						</main>
					</div>
				</div>
      </BasePage>
    </BaseLayout>
  )
};

// export async function getServerSideProps({query}) {
//   const json = await new PortfolioApi().getById(query.id);
//   const portfolio = json.data;
//   return {
//     props: { portfolio }
//   }
// }

// // This functions is executed at the build time
export async function getStaticPaths() {
  const json = await new PortfolioApi().getAll();
  const portfolios = json.data;

  // Get the paths we want pre-render based on portfolio ID
  const paths = portfolios.map(portfolio => {
    return {
      params: {id: portfolio._id}
    }
  })

  // false means that "not found pages" will be resolved into 404 page
  return { paths, fallback: true };
}

export async function getStaticProps({params}) {

  const json = await new PortfolioApi().getById(params.id);
  const portfolio = json.data;
  return { 
		props: { portfolio },
    revalidate: 30
	}
}

export default Portfolio;

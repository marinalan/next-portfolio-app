import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import PortfolioApi from '@/lib/api/portfolios';
import { formatDate } from'@/helpers/functions';

const Portfolio = ({portfolio}) => {
  const { user, isLoading } = useUser();

	// TODO: Provide proper stylings!!!
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
					<div class="cover-container d-flex h-100 p-3 mx-auto flex-column">
						<main role="main" class="inner page-cover">
							<h1 class="cover-heading">{portfolio.title}</h1>
							<p class="lead dates">{formatDate(portfolio.startDate)}-{formatDate(portfolio.endDate) || 'Present'}</p>
							<p class="lead info mb-0">{portfolio.jobTitle} | {portfolio.company} | {portfolio.location}</p>
							<p class="lead">{portfolio.description}</p>
							<p class="lead">
								<a href={portfolio.companyWebsite} target="_blank" class="btn btn-lg btn-secondary">Visit Company</a>
							</p>
						</main>
					</div>
				</div>
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

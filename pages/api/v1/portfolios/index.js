import PortfolioApi from '@/lib/api/portfolios';
import auth0 from '@/utils/auth0';

export default async function createPortfolio(req, res) {
  try {
    const { accessToken } = await auth0.getSession(req, res);
    const json = await new PortfolioApi(accessToken).create(req.body);
    return res.json(json.data);
  } catch(e) {
    console.log(e);
    console.log('we are getting error here! talking to ' + process.env.PORTFOLIO_API_URL + '/portfolios');
    return res.status(e.status || 400).end(e.response.data);
  }
}

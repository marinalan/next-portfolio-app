import { initAuth0 } from '@auth0/nextjs-auth0';

const auth0 = initAuth0({
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  // audience: process.env.AUTH0_AUDIENCE,
  secret: process.env.AUTH0_SECRET,
  // storeAccessToken: true
});

export default auth0;

export const isAuthorized = (user, role) => {
  return (user && user[process.env.AUTH0_NAMESPACE+'/roles'].includes(role));
}

export const authorizeUser = async (req, res) => {
  const session = await auth0.getSession(req, res);
  if (!session || !session.user) {
    res.writeHead(302, {
      Location: 'api/auth/login'
    });
    res.end();
    return null;
  }

  return session.user;
}
 
export const withAuth = getData => role => async ({req, res}) => {
  const session = await auth0.getSession(req, res);
  if (!session || 
      !session.user || 
      (role && !isAuthorized(session.user, role))) {

    res.writeHead(302, {
      Location: 'api/auth/login'
    });
    res.end();
    return {props:{}};
  }

  const data = getData ? await getData({req, res}, session.user) : {};

  return { props: {user: session.user, ...data} };
}
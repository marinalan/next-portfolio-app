import { useUser } from '@auth0/nextjs-auth0';
//import { useGetUser } from '@/actions/user';
import Redirect from '@/components/shared/Redirect';

const withAuth = (Component) => 
  function Comp(props) {
    const { user, loading } = useUser();
    //const { data: user, loading } = useGetUser();

    if (loading) {
      return <p>Loading...</p>
    }

    if (!user) {
      return <Redirect ssr to="/api/auth/login" />;
    } else {
      return <Component user={user} loading={loading} {...props} />;
    }

  }

export default withAuth;
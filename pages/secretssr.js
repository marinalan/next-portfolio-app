import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from "@/components/BasePage";
//import auth0 from '@/utils/auth0';
import { authorizeUser, withAuth } from '@/utils/auth0';

const SecretSSR = ({user, title}) => {
  return (
    <BaseLayout
      user={user}
      loading={false}
    >
      <BasePage>
        <h1>I Secret page hello {user?.name}</h1>
        <h2>{title}</h2>
        <img src={user.picture} alt={user.name} />
      </BasePage>
    </BaseLayout>
  )
}

//export const getServerSideProps = async ({req, res}) => {
//  const user = await authorizeUser(req, res);
//
//  return {
//    props: { user }
//  }
//}

const getTitle = () => {
  return new Promise((res) => {
    setTimeout(() => {
      res( { title: 'My new title!'})
    }, 500)
  })
}

export const getServerSideProps = withAuth(async ({req, res}, user) => {
  const title = await getTitle();
  return title;
});
//export const getServerSideProps = withPageAuthRequired();

// export const getServerSideProps = withPageAuthRequired();
//async ({req, res}) => {
//  const session = await auth0.getSession(req);
//  if (!session || !session.user) {
//    res.writeHead(302, {
//      Location: 'api/auth/login'
//    });
//    res.end();
//    return {props:{}};
//  }
//  return {
//    props: { user: session.user}
//  }
//};

export default SecretSSR;

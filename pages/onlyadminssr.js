import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from "@/components/BasePage";
import { authorizeUser, withAuth } from '@/utils/auth0';

const OnlyAdminSSR = ({user, title}) => {
  return (
    <BaseLayout
      user={user}
      loading={false}
    >
      <BasePage>
        <h1>AdminSSR {user?.name}</h1>
        <h2>{title}</h2>
        <img src={user.picture} alt={user.name} />
      </BasePage>
    </BaseLayout>
  )
}

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
})('admin');
//export const getServerSideProps = withPageAuthRequired();

export default OnlyAdminSSR;


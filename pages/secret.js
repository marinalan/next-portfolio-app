import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from "@/components/BasePage";
import withAuth from '@/hoc/withAuth';

const Secret = ({user, loading}) => {

  return (
    <BaseLayout
      user={user}
      loading={loading}
    >
      <BasePage>
        <h1>I Secret page hello {user.name}</h1>
        <img src={user.picture} alt={user.name} />
      </BasePage>
    </BaseLayout>
  )
}

export default withAuth(Secret);
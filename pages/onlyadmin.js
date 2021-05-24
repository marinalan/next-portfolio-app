import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from "@/components/BasePage";
import withAuth from '@/hoc/withAuth';

const OnlyAdmin = ({user, loading}) => {

  return (
    <BaseLayout
      user={user}
      loading={loading}
    >
      <BasePage>
        <h1>Admin Page {user.name}</h1>
        <img src={user.picture} alt={user.name} />
      </BasePage>
    </BaseLayout>
  )
}

export default withAuth(OnlyAdmin)('admin');
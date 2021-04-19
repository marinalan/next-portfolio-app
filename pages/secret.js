import { useUser } from '@auth0/nextjs-auth0';
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import Redirect from '@/components/shared/Redirect';

const Secret = () => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!user) {
    return <Redirect to="/api/auth/login" />;
  }

  return (
    <BaseLayout
      user={user}
      loading={isLoading}
    >
      <BasePage>
        <h1>I Secret page</h1>
      </BasePage>
    </BaseLayout>
  )
}

export default Secret;
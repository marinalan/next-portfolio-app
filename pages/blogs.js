import { useUser } from '@auth0/nextjs-auth0';
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";

const Blogs = () => {
  const { user, isLoading } = useUser();

  return (
    <BaseLayout
      user={user}
      loading={isLoading}
    >
      <BasePage>
        <h1>I am a 'blogs' page...</h1>
      </BasePage>
    </BaseLayout>
  );
};

export default Blogs;
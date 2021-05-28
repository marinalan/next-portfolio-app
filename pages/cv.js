import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import withAuth from '@/hoc/withAuth';

const Cv = ({user, loading}) => {

  return (
    <BaseLayout
      user={user}
      loading={loading}
    >
      <BasePage>
        <h1>I am a 'cv' page</h1>
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth(Cv)();
import { Row, Col } from "reactstrap";
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import withAuth from '@/hoc/withAuth';

const Cv = ({user, loading}) => {

  return (
    <BaseLayout
      user={user}
      loading={loading}
    >
      <BasePage
				title="My Experiences - Marina Landisberg"
			>
        <Row>
					<Col md={{size: 10, offset: 1}}>
						<iframe style={{width: '100%', height: '800px'}}
							src="/MarinaLandisberg_resume.pdf"
						></iframe>
					</Col>
				</Row>
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth(Cv)();
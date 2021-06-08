import { Row, Col } from 'reactstrap';
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import withAuth from '@/hoc/withAuth';
import { useRouter } from 'next/router';
import { useGetPortfolio, useUpdatePortfolio } from '@/actions/portfolios'; 
import PortfolioForm from '@/components/PortfolioForm';
import { toast } from 'react-toastify';

const PortfolioEdit = ({user}) => {
  const router = useRouter();
  const [ updatePortfolio, {data, error, loading} ] = useUpdatePortfolio();
  const { data: initialData } = useGetPortfolio(router.query.id);

  const _updatePortfolio = async (data) => {
    // try {
    //   await updatePortfolio(router.query.id, data);
    //   toast.success('Portfolio has been updated!', { autoClose: 2000 });
    // } catch(e) {
    //   toast.error('Oooops some error!', { autoClose: 2000 });
    // }

    //updatePortfolio(router.query.id, data)
    //.then(() => toast.success('Portfolio has been updated!', { autoClose: 2000 }))
    //.catch(() => toast.error('Oooops some error!', { autoClose: 2000 }));

    await updatePortfolio(router.query.id, data);
    toast.success('Portfolio has been updated!', { autoClose: 2000 });
  }

  return (
    <BaseLayout user={user} loading={false}>
      <BasePage header="Portfolio Edit">
        <Row>
          <Col md="8">
            { initialData && 
              <PortfolioForm 
                initialData={initialData}
                onSubmit={_updatePortfolio} 
              />
            }
            { error && <div className="alert alert-danger">{error}</div> }
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  )
};

export default withAuth(PortfolioEdit)('admin');
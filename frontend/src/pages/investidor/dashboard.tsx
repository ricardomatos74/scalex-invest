import withAuth from '../../components/withAuth';

function InvestidorDashboard() {
  return <h1>Dashboard do Investidor</h1>;
}

export default withAuth(InvestidorDashboard, ['investidor']);

import withAuth from '../../components/withAuth';

function EmpresaDashboard() {
  return <h1>Dashboard da Empresa</h1>;
}

export default withAuth(EmpresaDashboard, ['empresa']);

import withAuth from '../../components/withAuth';

function AdminPainel() {
  return <h1>Painel Admin</h1>;
}

export default withAuth(AdminPainel, ['admin']);

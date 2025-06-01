import { withAuth } from '../../components/withAuth';

function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Painel do Administrador</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <p className="text-gray-600">Usuários cadastrados</p>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <p className="text-gray-600">Projetos pendentes</p>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <p className="text-gray-600">Total investido</p>
          <p className="text-2xl font-bold">R$ 0,00</p>
        </div>
      </div>
    </div>
  );
}

export default withAuth(AdminDashboard, ['admin']);

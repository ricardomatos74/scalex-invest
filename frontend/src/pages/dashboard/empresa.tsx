import { withAuth } from '../../components/withAuth';
import { getToken, parseToken } from '../../utils/auth';

function EmpresaDashboard() {
  const token = getToken();
  const payload = token ? parseToken(token) : null;
  const name = payload?.name || 'Empresa';

  return (
    <div>
      <div className="p-4 bg-white rounded shadow mb-4">
        <h1 className="text-xl font-semibold">Bem-vindo, {name}</h1>
      </div>
      <button className="mb-6 bg-blue-600 text-white px-4 py-2 rounded">
        Cadastrar novo projeto
      </button>
      <h2 className="text-lg font-semibold mb-2">Meus projetos</h2>
      <p>Nenhum projeto cadastrado.</p>
    </div>
  );
}

export default withAuth(EmpresaDashboard, ['empresa']);

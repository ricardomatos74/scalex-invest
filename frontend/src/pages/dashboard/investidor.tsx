import { withAuth } from '../../components/withAuth';

const projects = [
  { id: 1, name: 'Projeto A', target: 50000 },
  { id: 2, name: 'Projeto B', target: 75000 },
  { id: 3, name: 'Projeto C', target: 100000 },
];

function InvestidorDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Bem-vindo ao ScaleX Invest</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="p-4 bg-white rounded shadow">
            <h2 className="font-semibold text-lg mb-2">{project.name}</h2>
            <p className="mb-4">Meta: R$ {project.target.toLocaleString()}</p>
            <button className="bg-blue-600 text-white px-3 py-1 rounded">
              Ver mais
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withAuth(InvestidorDashboard, ['investidor']);

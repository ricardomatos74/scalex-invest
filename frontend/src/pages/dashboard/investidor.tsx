import { useEffect, useState } from 'react';
import { withAuth } from '../../components/withAuth';
import api from '../../services/api';

function InvestidorDashboard() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    api.get('/projects').then((res) => setProjects(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Bem-vindo ao ScaleX Invest</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="p-4 bg-white rounded shadow">
            {project.media && (
              project.media.includes('video') ? (
                <video src={project.media} controls className="mb-2 max-h-48" />
              ) : (
                <img src={project.media} alt="mídia" className="mb-2 max-h-48" />
              )
            )}
            <h2 className="font-semibold text-lg mb-2">{project.title}</h2>
            <p className="mb-1">Meta: {project.targetValue}</p>
            <p className="mb-4">Cotas: {project.quotaCount}</p>
            <button className="bg-blue-600 text-white px-3 py-1 rounded">Ver mais</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withAuth(InvestidorDashboard, ['investidor']);

import { useEffect, useState } from 'react';
import { withAuth } from '../../components/withAuth';
import { getToken, parseToken } from '../../utils/auth';
import api from '../../services/api';

function EmpresaDashboard() {
  const token = getToken();
  const payload = token ? parseToken(token) : null;
  const name = payload?.name || 'Empresa';
  const userId = payload?.userId;

  const [projects, setProjects] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    targetValue: '',
    quotaCount: '',
    category: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  async function fetchProjects() {
    const res = await api.get('/projects');
    const all = res.data as any[];
    setProjects(all.filter((p) => p.userId === userId));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] || null;
    setFile(f);
    if (f) {
      setPreview(URL.createObjectURL(f));
    } else {
      setPreview(null);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');
    let media: string | undefined;
    if (file) {
      media = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = () => reject();
        reader.readAsDataURL(file);
      });
    }

    try {
      await api.post('/projects', {
        title: form.title,
        description: form.description,
        targetValue: Number(form.targetValue),
        quotaCount: Number(form.quotaCount),
        category: form.category,
        media,
      });
      setMessage('Projeto salvo com sucesso');
      setForm({ title: '', description: '', targetValue: '', quotaCount: '', category: '' });
      setFile(null);
      setPreview(null);
      setShowForm(false);
      fetchProjects();
    } catch {
      setMessage('Erro ao salvar projeto');
    }
  }

  return (
    <div>
      <div className="p-4 bg-white rounded shadow mb-4">
        <h1 className="text-xl font-semibold">Bem-vindo, {name}</h1>
      </div>
      <button
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setShowForm(!showForm)}
      >
        Cadastrar novo projeto
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white rounded shadow flex flex-col gap-2">
          <input
            className="border p-2"
            placeholder="Título"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <textarea
            className="border p-2"
            placeholder="Descrição"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            className="border p-2"
            placeholder="Valor alvo"
            type="number"
            value={form.targetValue}
            onChange={(e) => setForm({ ...form, targetValue: e.target.value })}
          />
          <input
            className="border p-2"
            placeholder="Quantidade de cotas"
            type="number"
            value={form.quotaCount}
            onChange={(e) => setForm({ ...form, quotaCount: e.target.value })}
          />
          <input
            className="border p-2"
            placeholder="Categoria"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <input
            type="file"
            accept=".jpg,.png,.mp4"
            onChange={handleFileChange}
          />
          {preview && (
            preview.includes('video') ? (
              <video src={preview} controls className="max-h-48" />
            ) : (
              <img src={preview} alt="Pré-visualização" className="max-h-48" />
            )
          )}
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Salvar
          </button>
          {message && <p className="text-sm mt-2">{message}</p>}
        </form>
      )}

      <h2 className="text-lg font-semibold mb-2">Meus projetos</h2>
      {projects.length === 0 && <p>Nenhum projeto cadastrado.</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => (
          <div key={p.id} className="p-4 bg-white rounded shadow">
            {p.media && (
              p.media.includes('video') ? (
                <video src={p.media} controls className="mb-2 max-h-48" />
              ) : (
                <img src={p.media} alt="mídia" className="mb-2 max-h-48" />
              )
            )}
            <h3 className="font-semibold mb-2">{p.title}</h3>
            <p className="text-sm mb-1">Meta: {p.targetValue}</p>
            <p className="text-sm mb-1">Cotas: {p.quotaCount}</p>
            <p className="text-sm">Categoria: {p.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withAuth(EmpresaDashboard, ['empresa']);

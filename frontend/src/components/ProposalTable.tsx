import { useState } from 'react';

export interface Proposal {
  id: number;
  amount: number;
  status: string;
  investor?: { name?: string } | null;
  project?: { title?: string } | null;
}

export default function ProposalTable({ proposals }: { proposals: Proposal[] }) {
  const [filter, setFilter] = useState('');
  const filtered = proposals.filter((p) => {
    const term = filter.toLowerCase();
    return (
      p.status.toLowerCase().includes(term) ||
      p.project?.title?.toLowerCase().includes(term) ||
      p.investor?.name?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-2">Propostas</h2>
      <input
        placeholder="Filtrar"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border p-2 mb-2"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Projeto</th>
              <th className="border px-2 py-1">Investidor</th>
              <th className="border px-2 py-1">Valor</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="text-center">
                <td className="border px-2 py-1">{p.project?.title || p.id}</td>
                <td className="border px-2 py-1">{p.investor?.name || p.id}</td>
                <td className="border px-2 py-1">{p.amount}</td>
                <td className="border px-2 py-1">
                  <span className="px-2 py-1 rounded bg-gray-200">{p.status}</span>
                </td>
                <td className="border px-2 py-1">
                  <button disabled className="text-xs bg-gray-300 px-2 py-1 mr-1 cursor-not-allowed">Cancelar</button>
                  <button disabled className="text-xs bg-gray-300 px-2 py-1 cursor-not-allowed">Suspender usuário</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

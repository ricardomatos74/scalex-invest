import { useState } from 'react';
import api from '../services/api';

interface ProposalModalProps {
  postId: number;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ProposalModal({ postId, isOpen, onClose, onSuccess }: ProposalModalProps) {
  const [amount, setAmount] = useState('');
  const [percentage, setPercentage] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await api.post('/propostas', {
        postId,
        amount: Number(amount),
        percentageRequested: Number(percentage),
        message,
      });
      setSuccess('Proposta enviada com sucesso');
      setAmount('');
      setPercentage('');
      setMessage('');
      onSuccess();
      setTimeout(() => {
        setSuccess('');
        onClose();
      }, 1000);
    } catch {
      setError('Erro ao enviar proposta');
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded w-80">
        <h2 className="text-lg font-semibold mb-2">Nova Proposta</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Valor a investir"
            className="border p-2"
          />
          <input
            type="number"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            placeholder="% de equity desejado"
            className="border p-2"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Mensagem (opcional)"
            className="border p-2"
          />
          {error && <p className="text-red-600">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={onClose} className="p-2 border">
              Cancelar
            </button>
            <button type="submit" className="bg-blue-600 text-white p-2">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

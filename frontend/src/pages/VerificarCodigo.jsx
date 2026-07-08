import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function VerificarCodigo() {

  const navegar = useNavigate();
  const location = useLocation();
  const email = location.state.email;

  const [codigo, setCodigo] = useState('');
  const [erro, setErro] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const resposta = await fetch('http://localhost:3001/api/verificar-codigo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, codigo })
      });

      const dados = await resposta.json();

      if (dados.erro) {
        setErro(dados.erro);
        return;
      }

      // Código correto → vai para página de nova senha
      navegar('/nova-senha', { state: { email } });

    } catch (error) {
      setErro('Erro ao conectar com o servidor');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">

        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Digite o código
        </h1>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Enviamos um código de 6 dígitos para {email}
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="000000"
            maxLength={6}
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2 px-4
                       text-center text-2xl tracking-widest mb-4
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {erro && (
            <p className="text-red-600 text-sm text-center mb-3">{erro}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg
                       font-medium hover:bg-blue-700 active:scale-[0.98]
                       transition-all duration-150"
          >
            Verificar
          </button>
        </form>
      </div>
    </div>
  )
}

export default VerificarCodigo;
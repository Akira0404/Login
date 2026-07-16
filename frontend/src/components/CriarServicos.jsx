import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

function CriarServicos({ isOpen, onClose, onCadastrado }) {
  const [form, setForm] = useState({ nome: "", preco: "", duracao: "" });
  const [toast, setToast] = useState(null); // "sucesso" ou "erro"

  if (!isOpen) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/criar-servicos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setToast("sucesso");
        setTimeout(() => {
          setToast(null);
          onCadastrado();
          setForm({ nome: "", preco: "", duracao: "" });
          onClose();
        }, 1500); // espera 1.5s antes de fechar
      } else {
        setToast("erro");
        setTimeout(() => setToast(null), 2000);
      }
    } catch (error) {
      setToast("erro");
      setTimeout(() => setToast(null), 2000);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4
                    animate-[fadeIn_0.2s_ease_forwards]">

      {/* Toast de feedback */}
      {toast && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[60] px-6 py-3 rounded-xl text-sm font-medium shadow-lg
                         animate-[slideDown_0.3s_ease_forwards]
                         ${toast === "sucesso"
                           ? "bg-green-600 text-white"
                           : "bg-red-600 text-white"}`}
        >
          {toast === "sucesso" ? "Serviço criado com sucesso!" : "Erro ao criar serviço"}
        </div>
      )}

      <div className="bg-[#1a1a1a] border border-[#2e2e2e] text-white p-6 rounded-2xl w-100 relative
                      animate-[modalIn_0.3s_ease_forwards]">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <FaTimes size={20} />
        </button>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            Serviço:
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              className="bg-[#2a2a2a] border border-[#3e3e3e] rounded-lg px-4 py-2.5 text-white
                         focus:outline-none focus:border-[#c8a97e] transition-colors w-full"
            />
          </label>

          <label className="flex flex-col gap-1">
            Preço:
            <div className="flex items-center bg-[#2a2a2a] border border-[#3e3e3e] rounded-lg px-4 py-1">
              <span className="text-gray-400">R$</span>
              <input
                type="text"
                name="preco"
                value={form.preco}
                onChange={handleChange}
                placeholder="0,00"
                className="bg-[#2a2a2a] rounded-lg px-2 py-2.5 text-white
                           focus:outline-none focus:border-[#c8a97e] transition-colors w-full"
              />
            </div>
          </label>

          <label className="flex flex-col gap-1">
            Duração:
            <input
              type="text"
              name="duracao"
              value={form.duracao}
              onChange={handleChange}
              className="bg-[#2a2a2a] border border-[#3e3e3e] rounded-lg px-4 py-2.5 text-white
                         focus:outline-none focus:border-[#c8a97e] transition-colors w-full"
            />
          </label>

          <button
            type="submit"
            className="mt-2 w-full bg-[#c8a97e] text-black font-medium py-2.5 rounded-lg
                       hover:bg:bg-[#b09268] transition-colors"
          >
            Criar
          </button>
        </form>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translate(-50%, -20px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  );
}

export default CriarServicos;
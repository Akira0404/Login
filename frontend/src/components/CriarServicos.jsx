import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

function CriarServicos({ isOpen, onClose, onCadastrado }) {
  const [form, setForm] = useState({
    nome: "",
    preco: "",
    duracao: "",
  });

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
        onCadastrado();
        setForm({ nome: "", preco: "", duracao: "" });
        onClose();
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] border border-[#2e2e2e] text-white p-6 rounded-2xl w-100 relative">

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
              className="bg-[#2a2a2a] border border-[#3e3e3e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#c8a97e] transition-colors w-full"
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
              className="bg-[#2a2a2a]  rounded-lg px-2 py-2.5 text-white focus:outline-none focus:border-[#c8a97e] transition-colors w-full"
            />
            </div>
          </label>

          <div className="">
          <label className="flex flex-col gap-1">
            Duração:
            <input
              type="text"
              name="duracao"
              value={form.duracao}
              onChange={handleChange}
              className="bg-[#2a2a2a] border border-[#3e3e3e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#c8a97e] transition-colors w-full"
            />
          </label>
          </div>

          <button
            type="submit"
            className="mt-2 w-full bg-[#c8a97e] text-black font-medium py-2.5 rounded-lg hover:bg-[#b09268] transition-colors"
          >
            Criar
          </button>
        </form>

      </div>
    </div>
  );
}

export default CriarServicos;
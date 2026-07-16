import React, { useState } from "react";
import { FaTimes, FaPlus, FaClock, FaCalendarAlt, FaTag } from "react-icons/fa";

function CriarServicos({ isOpen, onClose, onCadastrado }) {
  const [form, setForm] = useState({
    nome: "",
    preco: "",
    duracao: "",
    nomeRegra: "",
    dataInicio: "",
    dataFim: "",
    horaInicio: "",
    horaFim: "",
  });
  const [toast, setToast] = useState(null);
  const [expandido, setExpandido] = useState(false);

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
          setForm({
            nome: "",
            preco: "",
            duracao: "",
            nomeRegra: "",
            dataInicio: "",
            dataFim: "",
            horaInicio: "",
            horaFim: "",
          });
          setExpandido(false);
          onClose();
        }, 1500);
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4
                    animate-[fadeIn_0.2s_ease_forwards]">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[60] px-6 py-3 rounded-xl text-sm font-medium shadow-lg
                         animate-[slideDown_0.3s_ease_forwards]
                         ${toast === "sucesso" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
          {toast === "sucesso" ? "Serviço criado com sucesso!" : "Erro ao criar serviço"}
        </div>
      )}

      {/* Modal com scroll */}
      <div className="bg-[#161616] border border-[#2a2a2a] text-white rounded-2xl w-[420px] relative shadow-2xl
                      animate-[modalIn_0.3s_ease_forwards]
                      max-h-[90vh] overflow-y-auto">

        <div className="p-8">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Novo Serviço</h2>
              <p className="text-sm text-gray-500 mt-1">Preencha as informações abaixo</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1e1e1e] border border-[#2a2a2a]
                         text-gray-500 hover:text-white hover:border-[#c8a97e]/40 transition-all"
            >
              <FaTimes size={14} />
            </button>
          </div>

          {/* Separador */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#c8a97e]/20 to-transparent mb-6" />

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Nome do serviço */}
            <label className="flex flex-col gap-2">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Serviço</span>
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                placeholder="Ex: Corte de cabelo"
                className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm
                           placeholder:text-gray-600
                           focus:outline-none focus:border-[#c8a97e]/50 focus:ring-1 focus:ring-[#c8a97e]/20
                           transition-all w-full"
              />
            </label>

            {/* Preço e Duração */}
            <div className="flex gap-3">
              <label className="flex flex-col gap-2 flex-1">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Preço</span>
                <div className="flex items-center bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl px-4 py-3
                               focus-within:border-[#c8a97e]/50 focus-within:ring-1 focus-within:ring-[#c8a97e]/20
                               transition-all">
                  <span className="text-[#c8a97e] text-sm font-medium mr-2">R$</span>
                  <input
                    type="text"
                    name="preco"
                    value={form.preco}
                    onChange={handleChange}
                    placeholder="0,00"
                    className="bg-transparent text-white text-sm placeholder:text-gray-600 focus:outline-none w-full"
                  />
                </div>
              </label>

              <label className="flex flex-col gap-2 flex-1">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Duração</span>
                <div className="flex items-center bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl px-4 py-3
                               focus-within:border-[#c8a97e]/50 focus-within:ring-1 focus-within:ring-[#c8a97e]/20
                               transition-all">
                  <FaClock className="text-gray-600 text-xs mr-2" />
                  <input
                    type="text"
                    name="duracao"
                    value={form.duracao}
                    onChange={handleChange}
                    placeholder="30 min"
                    className="bg-transparent text-white text-sm placeholder:text-gray-600 focus:outline-none w-full"
                  />
                </div>
              </label>
            </div>

            {/* Botão adicionar regra */}
            <button
              type="button"
              onClick={() => setExpandido(!expandido)}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#1c1c1c] border border-dashed border-[#2a2a2a]
                         rounded-xl text-sm text-gray-500 hover:text-[#c8a97e] hover:border-[#c8a97e]/30
                         transition-all group"
            >
              <FaPlus size={10} className="group-hover:rotate-90 transition-transform duration-300" />
              <span>Adicionar Regra</span>
            </button>

            {/* Campos extras */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out
                            ${expandido ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="flex flex-col gap-5 pt-1">

                {/* Separador Regras */}
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-[#2a2a2a]" />
                  <span className="text-xs text-gray-500 uppercase tracking-widest">Regras</span>
                  <div className="h-px flex-1 bg-[#2a2a2a]" />
                </div>

                {/* Nome da Regra */}
                <label className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <FaTag className="text-[#c8a97e] text-xs" />
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Nome da Regra</span>
                  </div>
                  <input
                    type="text"
                    name="nomeRegra"
                    value={form.nomeRegra}
                    onChange={handleChange}
                    placeholder="Ex: Horário de pico, Fim de semana..."
                    className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm
                               placeholder:text-gray-600
                               focus:outline-none focus:border-[#c8a97e]/50 focus:ring-1 focus:ring-[#c8a97e]/20
                               transition-all w-full"
                  />
                </label>

                {/* Data */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FaCalendarAlt className="text-[#c8a97e] text-xs" />
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Período</span>
                  </div>
                  <div className="flex gap-3">
                    <label className="flex flex-col gap-2 flex-1">
                      <span className="text-xs text-gray-500">Início</span>
                      <input
                        type="date"
                        name="dataInicio"
                        value={form.dataInicio}
                        onChange={handleChange}
                        className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm
                                   focus:outline-none focus:border-[#c8a97e]/50 focus:ring-1 focus:ring-[#c8a97e]/20
                                   transition-all w-full [color-scheme:dark]"
                      />
                    </label>
                    <label className="flex flex-col gap-2 flex-1">
                      <span className="text-xs text-gray-500">Fim</span>
                      <input
                        type="date"
                        name="dataFim"
                        value={form.dataFim}
                        onChange={handleChange}
                        className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm
                                   focus:outline-none focus:border-[#c8a97e]/50 focus:ring-1 focus:ring-[#c8a97e]/20
                                   transition-all w-full [color-scheme:dark]"
                      />
                    </label>
                  </div>
                </div>

                {/* Horário */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FaClock className="text-[#c8a97e] text-xs" />
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Horário</span>
                  </div>
                  <div className="flex gap-3">
                    <label className="flex flex-col gap-2 flex-1">
                      <span className="text-xs text-gray-500">Início</span>
                      <input
                        type="time"
                        name="horaInicio"
                        value={form.horaInicio}
                        onChange={handleChange}
                        className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm
                                   focus:outline-none focus:border-[#c8a97e]/50 focus:ring-1 focus:ring-[#c8a97e]/20
                                   transition-all w-full [color-scheme:dark]"
                      />
                    </label>
                    <label className="flex flex-col gap-2 flex-1">
                      <span className="text-xs text-gray-500">Fim</span>
                      <input
                        type="time"
                        name="horaFim"
                        value={form.horaFim}
                        onChange={handleChange}
                        className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm
                                   focus:outline-none focus:border-[#c8a97e]/50 focus:ring-1 focus:ring-[#c8a97e]/20
                                   transition-all w-full [color-scheme:dark]"
                      />
                    </label>
                  </div>
                </div>

              </div>
            </div>

            {/* Botão de criar */}
            <button
              type="submit"
              className="mt-2 w-full bg-[#c8a97e] text-black font-semibold text-sm py-3.5 rounded-xl
                         hover:bg-[#b8996e] active:scale-[0.98] transition-all duration-150
                         shadow-lg shadow-[#c8a97e]/10"
            >
              Criar Serviço
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default CriarServicos;
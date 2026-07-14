import { React, useState }from "react";
import { FaTimes } from "react-icons/fa";

function ModalInfo({ isOpen, onClose, nome, preco, tempo }) {

  const []

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 ">
      {/* Card interno do Modal */}
      <div className="bg-[#1a1a1a] border border-[#2e2e2e] text-white p-6 rounded-2xl w-100 h-120 relative ">
        
        {/* Botão de fechar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <FaTimes size={20} />
        </button>

        <div className="flex flex-col gap-4 justify-center mt-8">

          <p className="text-3xl">Crie seus serviços</p>

          <label>Serviço:
            <input 
            type="text" 
            id="servico"
            className="bg-[#2a2a2a] border border-[#3e3e3e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#c8a97e] transition-colors w-full"
            />
          </label>
          <label>Preço:
            <input 
            type="text" 
            id="preco"
            className="bg-[#2a2a2a] border border-[#3e3e3e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#c8a97e] transition-colors w-full"
             />
          </label>
        
          <label>Tempo:
            <input 
            type="text" 
            id="tempo"
            className="bg-[#2a2a2a] border border-[#3e3e3e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#c8a97e] transition-colors w-full"
             />
          </label>

        </div>

        
        {/* Botão de ação */}
        <button 
          onClick={onClose}
          className="mt-6 w-full bg-[#c8a97e] text-black font-medium py-2 rounded-lg hover:bg-[#b09268] transition-colors"
        >
          Criar
        </button>

      </div>
    </div>
  );
}

export default ModalInfo;
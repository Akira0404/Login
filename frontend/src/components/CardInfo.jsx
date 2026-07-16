import React, { useState } from "react"; 
import { FaPlus } from "react-icons/fa";
import CriarServicos from "./CriarServicos";

function CardInfo({ nome, preco, tempo }) { 

    const [modalOpen, setModalOpen] = useState(false);

    function handleCadastrado() {
    console.log("Serviço cadastrado!");
  }

  return ( 
    <>
     <div
        onClick={() => setModalOpen(true)}
        className="bg-[#111] border border-[#1e1e1e] rounded-xl p-5 hover:border-[#c8a97e]/20 transition-all flex justify-center h-45 max-w-60 items-center cursor-pointer"
      >
        <div className="bg-amber-50/10 w-20 h-20 rounded-full flex items-center justify-center">
          <FaPlus className="text-white/50 text-xl" />
        </div>
      </div>

      <CriarServicos
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCadastrado={handleCadastrado}
      />
      </>
  );
} 

export default CardInfo;
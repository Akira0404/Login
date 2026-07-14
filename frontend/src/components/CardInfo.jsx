import React, { useState } from "react"; 
import { FaPlus } from "react-icons/fa";

function CardInfo({ nome, preco, tempo }) { 

    const [modalOpen, setModalOpen] = useState(false)

  return ( 
    <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-5 hover:border-[#c8a97e]/20 transition-all flex justify-center h-60 max-w-100 items-center"> 
      <div className="bg-amber-50/10 w-20 h-20 rounded-full flex items-center justify-center"> 
        <FaPlus className="text-shadow-white-50/10 text-xl" /> 
      </div> 

    </div> 
  );
} 

export default CardInfo;
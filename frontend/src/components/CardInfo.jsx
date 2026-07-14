import React from "react";


function CardInfo({ nome, preco, tempo }) {

    return (
        <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-5 hover:border-[#c8a97e]/20 transition-all">
            <p className="font-medium">{nome}</p>
            <p className="text-2xl font-bold text-[#c8a97e] mt-2">{preco}</p>
            <p className="text-2xl font-bold text-[#c8a97e] mt-2">{tempo}</p>


        </div>
    )
}

export default CardInfo;
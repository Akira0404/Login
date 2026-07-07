import React from "react";
import { FaLock, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdEmail, MdSecurityUpdateWarning } from "react-icons/md";
import { AiTwotoneMail } from "react-icons/ai";
import { GrSecure } from "react-icons/gr"
import { useState } from "react";

async function VerificarCodigo() {

  const navegar = useNavigate();

  const resposta = await fetch('http://localhost:3001/api/verificar-codigo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm relative">
        {/* Setinha de voltar */}
        <button
          onClick={() => navegar("/")} // volta para o Login
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-800
                             transition-colors"
        >
          <FaArrowLeft size={20} />
        </button>

        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Verificação de código
        </h1>
        <p className="text-sm text-gray-500 mb-4 text-center">
          {" "}
          Informe o código enviado no email{" "}
        </p>
        <GrSecure className="size-10 ml-35" />

        {/* Campo Email */}
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1"></label>
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="exemplo@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg py-2 pl-5 pr-3
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-transparent transition"
            />
          </div>
        </div>

        
          {/* Mensagem de sucesso */}
          {mensagem && (
            <p className="text-green-600 text-sm text-center mb-3">
              {mensagem}
            </p>
          )}

          {/* Mensagem de erro */}
          {erro && (
            <p className="text-red-600 text-sm text-center mb-3">
              {erro}
            </p>
          )}

        {/* Botão */}
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg
                     font-medium hover:bg-blue-700 active:scale-[0.98]
                     transition-all duration-150"
        >
          Enviar
        </button>
        </form>
      </div>
    </div>
  );
}

export default VerificarCodigo;

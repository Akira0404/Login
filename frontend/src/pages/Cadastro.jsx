import React from 'react'
import { FaUser, FaLock, FaArrowLeft } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

function Cadastro() {

  const navegar = useNavigate();


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm relative">
        
              {/* Setinha de voltar */}
        <button
          onClick={() => navegar('/')}  // volta para o Login
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-800
                     transition-colors"
        >
          <FaArrowLeft size={20} />
        </button>

        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Cadastro
        </h1>

         {/* Campo Nome */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Nome
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FaUser />
            </span>
            <input
              type="text"
              name="nome"
              id="nome"
              placeholder="Nome completo"
              className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Campo Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <MdEmail />
            </span>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="exemplo@gmail.com"
              className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Campo Senha */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Senha
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FaLock />
            </span>
            <input
              type="password"
              name="senha"
              id="password"
              placeholder="Senha"
              className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-transparent transition"
            />
          </div>
        </div>

         {/* Campo Senha */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Confirmar senha
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FaLock />
            </span>
            <input
              type="password"
              name="confirmar_senha"
              id="confirmar_senha"
              placeholder='Confirmar senha'
              className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Botão */}
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg
                     font-medium hover:bg-blue-700 active:scale-[0.98]
                     transition-all duration-150"
        >
          Cadastrar
        </button>
      </div>
    </div>
  )
}

export default Cadastro
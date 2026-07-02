import React from 'react'
import { FaLock, FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { MdEmail } from 'react-icons/md'

function RecuperarSenha() {

  const navegar = useNavigate();

  const handleRecuperarSenha = () => {
    navegar('/recuperação de senha');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 flex-col gap-5 ">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        
         {/* Setinha de voltar */}
                <button
                  onClick={() => navigate('/')}  // volta para o Login
                  className="absolute top-4 left-4 text-gray-500 hover:text-gray-800
                             transition-colors"
                >
                  <FaArrowLeft size={20} />
                </button>
        

        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Recuperação de senha
        </h1>
        <p>coloque seu email para </p>

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


        {/* Botão */}
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg
                     font-medium hover:bg-blue-700 active:scale-[0.98]
                     transition-all duration-150"
        >
          Entrar
        </button>
      </div>
    </div>
  )
}

export default RecuperarSenha
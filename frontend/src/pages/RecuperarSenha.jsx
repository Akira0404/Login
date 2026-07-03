import React from 'react'
import { FaLock, FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { MdEmail } from 'react-icons/md'
import { AiTwotoneMail } from "react-icons/ai";

function RecuperarSenha() {

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
          Recuperação de senha
        </h1>
        <p className="text-sm text-gray-500 mb-4 text-center">  Informe o email associado à sua conta e enviaremos
  um link para redefinir sua senha. </p>
            <AiTwotoneMail className='size-10 ml-35' />

        {/* Campo Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="exemplo@gmail.com"
              className="w-full border border-gray-300 rounded-lg py-2 pl-5 pr-3
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
          Enviar
        </button>
      </div>
    </div>
  )
}

export default RecuperarSenha
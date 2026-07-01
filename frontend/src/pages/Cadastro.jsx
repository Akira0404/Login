import React from 'react'
import { FaUser, FaLock } from 'react-icons/fa'

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h1>

        {/* Campo Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FaUser />
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

        <div className='mb-4'>
            <a 
            href=""
            className='text-blue-800 underline decoration-solid flex justify-center'
            >
            Esqueceu a senha?</a>
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

export default Login
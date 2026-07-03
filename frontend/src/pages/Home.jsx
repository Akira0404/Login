import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSignOutAlt } from 'react-icons/fa'

function Home() {
  const navegar = useNavigate()

  const handleLogout = () => {
    navegar('/')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Meu Sistema</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-500 hover:text-red-600
                     transition-colors cursor-pointer"
        >
          <FaSignOutAlt />
          Sair
        </button>
      </nav>

      {/* Conteúdo */}
      <div className="flex flex-col items-center justify-center mt-20">
        <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Bem-vindo!
          </h2>
          <p className="text-gray-500">
            Você fez login com sucesso.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
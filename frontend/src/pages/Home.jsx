import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaHome, FaCalendarAlt, FaUser, FaCut,
  FaSignOutAlt, FaBars, FaSearch, FaBell,
  FaChevronRight, FaUserCircle
} from 'react-icons/fa';
import { GiRazor } from 'react-icons/gi';
import CardInfo from '../components/CardInfo';
import CriarServicos from '../components/CriarServicos';

function Servicos() {
  const [modalAberto, setModalAberto] = useState(false);
  const [servicos, setServicos] = useState([]);
}
 

function Home() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState('inicio');

  const usuario = {
    nome: 'João Silva',
    email: 'joao@email.com',
  };

  const menuItems = [
    { id: 'inicio', label: 'Início', icon: <FaHome /> },
    { id: 'agendamentos', label: 'Agendamentos', icon: <FaCalendarAlt /> },
    { id: 'servicos', label: 'Serviços', icon: <FaCut /> },
    { id: 'perfil', label: 'Meu Perfil', icon: <FaUser /> },
  ];

  

  function Sidebar({ className = '' }) {
    return (
      <div className={`bg-[#111] border-r border-[#1e1e1e] flex flex-col h-full ${className}`}>
        <div className="p-6 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-3">
            <GiRazor className="text-[#c8a97e] text-2xl" />
            <div>
              <h1 className="font-bold text-sm tracking-wider" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                BARBEARIA <span className="text-[#c8a97e]">REI</span>
              </h1>
              <p className="text-[10px] text-[#555] tracking-widest uppercase">Sistema</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setAbaAtiva(item.id);
                setMenuAberto(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm
                transition-all duration-200 ${
                abaAtiva === item.id
                  ? 'bg-[#c8a97e]/10 text-[#c8a97e] border border-[#c8a97e]/20'
                  : 'text-[#666] hover:text-[#aaa] hover:bg-[#1a1a1a] border border-transparent'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span className="tracking-wide">{item.label}</span>
              {abaAtiva === item.id && (
                <FaChevronRight className="ml-auto text-xs opacity-50" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[#1e1e1e]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#1e1e1e] border border-[#2a2a2a]
              flex items-center justify-center text-[#c8a97e]">
              <FaUserCircle className="text-xl" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{usuario.nome}</p>
              <p className="text-xs text-[#555] truncate">{usuario.email}</p>
            </div>
          </div>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm
            text-[#666] hover:text-red-400 hover:bg-red-400/5 transition-all">
            <FaSignOutAlt />
            <span>Sair</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0ece4]">

      {/* Sidebar desktop */}
      <aside className="hidden lg:block w-64 fixed top-0 left-0 h-screen z-40">
        <Sidebar />
      </aside>

      {/* Sidebar mobile */}
      <AnimatePresence>
        {menuAberto && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setMenuAberto(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-0 left-0 h-screen w-[280px] z-50 lg:hidden"
            >
              <Sidebar />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Conteúdo principal */}
      <div className="lg:ml-64">

        {/* Header */}
        <header className="sticky top-0 z-30 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#1e1e1e]">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMenuAberto(true)}
                className="lg:hidden text-[#666] hover:text-[#c8a97e] transition-colors"
              >
                <FaBars className="text-xl" />
              </button>

              <div className="hidden sm:flex items-center bg-[#111] border border-[#1e1e1e] rounded-lg px-4 py-2 w-64">
                <FaSearch className="text-[#444] mr-3 text-sm" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="bg-transparent text-sm w-full focus:outline-none text-[#aaa] placeholder:text-[#444]"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 text-[#666] hover:text-[#c8a97e] transition-colors">
                <FaBell />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="w-9 h-9 rounded-full bg-[#1a1a1a] border border-[#2a2a2a]
                flex items-center justify-center text-[#c8a97e] lg:hidden">
                <FaUserCircle />
              </div>
            </div>
          </div>
        </header>

        {/* Área de conteúdo */}
        <main className="p-4 sm:p-6 lg:p-8">

          {/* Saudação */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold">
              Olá, <span className="text-[#c8a97e]">{usuario.nome.split(' ')[0]}</span>
            </h2>
            <p className="text-[#666] text-sm mt-1">Confira nossos serviços</p>
          </div>

            <CardInfo />

            <CriarServicos />
        </main>
      </div>
    </div>
  );
}

export default Home;
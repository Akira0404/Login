import { useState } from 'react'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cadastro from './pages/Cadastro'
import RecuperarSenha from './pages/RecuperarSenha'
import Home from './pages/Home'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/recuperação de senha' element={<RecuperarSenha />} />
        <Route path='/home' element={<Home />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App

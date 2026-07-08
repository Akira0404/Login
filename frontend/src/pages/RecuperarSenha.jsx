import React from "react";
import { FaLock, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdEmail, MdSecurityUpdateWarning } from "react-icons/md";
import { AiTwotoneMail } from "react-icons/ai";
import { useState } from "react";
import Modal from "../components/Modal";
import { useEffect } from "react";

function RecuperarSenha() {
  const navegar = useNavigate();
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setMensagem("");
    setErro("");

    try {
      const resposta = await fetch(
        "http://localhost:3001/api/recuperar-senha",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      const dados = await resposta.json();

      if (dados.erro) {
        setErro(dados.erro);
        return;
      }

      setMostrarModal(true)

      setMensagem(dados.mensagem);

      setTimeout(() => {
        navegar("/verificar-codigo", { state: { email } });
      }, 1000);
    } catch (error) {
      setErro("Erro ao conectar com o servidor");
    }
  }

  function fecharModal() {
    setMostrarModal(false);
    navegar('/verificar-codigo', { state: { email } });
  }

  useEffect(() => {
    if(mostrarModal) {
      const timer = setTimeout(() => {
        fecharModal();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [mostrarModal]);

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
          Recuperação de senha
        </h1>
        <p className="text-sm text-gray-500 mb-4 text-center">
          {" "}
          Informe o email associado à sua conta e enviaremos
          um código para redefinir sua senha.{" "}
        </p>
        <AiTwotoneMail className="size-10 ml-35" />

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
        type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg
                     font-medium hover:bg-blue-700 active:scale-[0.98]
                     transition-all duration-150"
        >
          Enviar
        </button>
        </form>
      </div>

       {/* Modal aparece quando mostrarModal é true */}
      {mostrarModal && (
        <Modal
          mensagem={`Enviamos um código de 6 dígitos para ${email}`}
          onClose={fecharModal}
        />
      )}
    </div>
  );
}

export default RecuperarSenha;

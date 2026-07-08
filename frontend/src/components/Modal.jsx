import React from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane } from "react-icons/fa";

function Modal({ mensagem, onClose }) {

  const risquinhos = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      ></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl p-8 shadow-2xl w-80
                   text-center relative z-10"
      >
        {/* Área do avião e rastro */}
        <div className="relative h-24 mb-4 overflow-hidden flex items-center justify-center">

          {/* Risquinhos do rastro */}
          {risquinhos.map((i) => (
            <motion.span
              key={i}
              className="absolute text-blue-300 font-bold text-sm"
              style={{ top: '45%' }}
              animate={{
                x: [-100 + i * -15, -140 + i * -15],
                y: [i * 2 - 8, i * 4 - 8],
                opacity: [0.8 - i * 0.1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeOut",
              }}
            >
              - - -
            </motion.span>
          ))}

          {/* Avião */}
          <motion.span
            className="text-5xl relative z-10"
            animate={{
              x: [-60, 0, 60],
              y: [20, -10, -20],
              rotate: [-15, 0, 15],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FaPaperPlane />
          </motion.span>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Código enviado!
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          {mensagem}
        </p>

        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white py-2 rounded-lg
                     font-medium hover:bg-blue-700 active:scale-[0.98]
                     transition-all duration-150"
        >
          Entendi
        </button>
      </motion.div>
    </div>
  );
}

export default Modal;
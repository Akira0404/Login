const express = require('express');
const cors = require('cors');
const conexao = require('./config/database'); 
const bcrypt = require('bcryptjs');

const app = express();

app.use(cors());
app.use(express.json());

// ==== ROTAS ====

// CADASTRO
app.post('/api/auth/cadastro', (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        const senhaLimpa = String(senha).trim();
        // Usando a versão síncrona para não quebrar o callback do banco
        const senhaHash = bcrypt.hashSync(senhaLimpa, 10);

        const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';

        conexao.query(sql, [nome, email, senhaHash], (erro, resultado) => {
            if (erro) {
                if (erro.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ erro: 'Este e-mail já está cadastrado' });
                }
                return res.status(400).json({ erro: erro.message });
            }

            return res.status(201).json({
                mensagem: 'Usuário cadastrado com sucesso',
                id: resultado.insertId
            });
        });

    } catch (error) {
        return res.status(500).json({ erro: 'Erro interno no servidor' });
    }
});

// LOGIN
app.post('/login', (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ erro: 'E-mail e senha são obrigatórios' });
        }

        const sql = 'SELECT * FROM usuarios WHERE email = ?';

        conexao.query(sql, [email], (erro, resultado) => {
            if (erro) {
                return res.status(400).json({ erro: erro.message });
            }

            if (!resultado || resultado.length === 0) {
                return res.status(401).json({ mensagem: 'Email ou senha incorretos' });
            }

            const usuario = resultado[0];

            const hashDoBanco = String(usuario.senha).trim();
            const senhaDigitada = String(senha).trim();

            // SOLUÇÃO DO ERRO: Usando o compareSync aqui dentro do callback tradicional
            const senhaCorreta = bcrypt.compareSync(senhaDigitada, hashDoBanco);

            if (!senhaCorreta) {
                return res.status(401).json({ mensagem: 'Email ou senha incorretos' });
            }

            return res.json({ 
                mensagem: 'Login realizado com sucesso',
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email
                }
            });
        });

    } catch (error) {
        return res.status(500).json({ erro: 'Erro interno no servidor' });
    }
});

app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});
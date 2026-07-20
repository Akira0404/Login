const express = require('express');
const cors = require('cors');
const conexao = require('./config/database'); 
const bcrypt = require('bcryptjs');
const transporter = require('./config/email')

const app = express();

app.use(cors());
app.use(express.json());

// ==== ROTAS ====

// CADASTRO USUÁRIOS
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

// CADASTRO SERVIÇOS
app.post('/criar-servicos', (req, res) => {
    const { nome, preco, duracao, nomeRegra, dataInicio, dataFim, horaInicio, horaFim } = req.body;

    if(nomeRegra && dataInicio && dataFim && horaInicio && horaFim) {

        const sqlRegra = 'INSERT INTO regras (nome, data_inicio, data_fim, horario_inicio, horario_fim) VALUES (?,?,?,?,?)'
    
        conexao.query(sqlRegra, [nomeRegra, dataInicio, dataFim, horaInicio, horaFim], (erro, resultadoRegra) => {
            if(erro) {
                return res.status(500).json({ mensagem: "Erro ao criar regra!."})
            }
        })
        const regraId = resultadoRegra.insertId;
    
        const sqlServico = 'INSERT INTO servicos (titulo, preco, duracao, regra_id) VALUES (?,?,?,?)';
    
        conexao.query(sqlServico, [nome, preco, duracao, regraId], (erro, resultadoServico) => {
            if (erro) {
                return res.status(500).json({ mensagem: "Erro ao criar serviço!." });
            }
    
            return res.status(201).json({
                mensagem: "Serviço criado com sucesso!",
                servicoId: resultadoServico.insertId,
                regraId: regraId
            })
        })
    } else {
        // Sem regra — cria o serviço sem regra vinculada
        // Precisa de uma regra padrão ou tornar regra_id nullable
        const sqlServico = 'INSERT INTO servicos (titulo, preco, duracao) VALUES (?, ?, ?)';

        conexao.query(sqlServico, [nome, preco, duracao], (erro, resultadoServico) => {
            if (erro) {
                console.log('Erro ao criar serviço:', erro);
                return res.status(500).json({ mensagem: "Erro ao criar serviço" });
            }

            return res.status(201).json({
                mensagem: "Serviço criado com sucesso!",
                servicoId: resultadoServico.insertId
            });
        });
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

// Rota de recuperção de senha
app.post('/api/recuperar-senha', async (req, res) => {
    const { email } = req.body;

    const sql = 'SELECT * FROM usuarios WHERE email = ?';

    conexao.query(sql, [email], async (erro, resultado) => {
        if(erro) {
            return res.status(400).json({ erro: erro.mensagem });
        }

        if(!resultado || resultado.length === 0) {
            return res.status(404).json({ erro: 'E-mail não encontrado'});
        }

        const usuario = resultado[0];
        const codigo = Math.floor(100000 + Math.random() * 900000);

        await transporter.sendMail({
            from: "Recuperação de senha",
            to: email,
            subject: "↓ Seu código de recuperação ↓",
            html: `<h1>${codigo}</h1><br><p>Expira em 10 minutos</p>`
        });

        return res.json({ mensagem: 'Código enviado' });
    })
})

app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});
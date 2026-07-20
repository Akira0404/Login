const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'barbearia'
});

conexao.connect((erro) => {
    if (erro) {
        console.log('Erro ao conectar:', erro);
        return;
    }
    console.log('Conectado ao banco MYSQL');
});

module.exports = conexao;
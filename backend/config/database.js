const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'teste'
}).promise();

conexao.connect()
    .then(() => console.log('Conectado ao banco MYSQL'))
    .catch((erro) => console.log('Erro ao conectar:', erro));

module.exports = conexao;
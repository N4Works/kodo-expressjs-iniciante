'use strict';

// Importa a dependência referente ao ExpressJS
var express = require('express');
// Cria um server baseado no ExpressJS
var server = express();
// Obtém o objeto necessário para criação de rotas
var router = express.Router();

// Implementa a rota relativa "/" com o método "GET"
router
    .route('/')
    // @requisicao: O objeto requisição, contém os dados inseridos na requisição, parâmetros, json, arquivos, enfim,
    // qualquer coisa enviada ao servidor
    // @resposta: A resposta é utilizada para retornar valores ao sistema que chamou o método
    // @proximo: Esse parâmetro é um método utilizado para chamar a próxima camada de funções do ExpressJS, por padrão,
    // a próxima camada é o tratamento de erro do ExpressJS
    .get(function (requisicao, resposta, proximo) {
        // Aqui, nós indicamos que o HTTP Status da resposta será 200, ou seja, OK, e que será enviada a mensagem
        // "Hello World" com uma quebra de linha ao final
        return resposta.status(200).send('Hello World\n');
    });

// Neste ponto, indico ao servidor que quando o cliente chamar a rota absoluta "/hello-world" no endereço
// "localhost:3000/hello-world", a rota criada acima deve ser utilizada
server.use('/hello-world', router);

// Subo o servidor na porta 3000
server.listen(3000, function () {
    // Ao subir o servidor, exibo as mensagens abaixo no terminal
    console.log('Server rodando no endereço http://localhost:3000.');
    console.log('Execute o comando "curl http://localhost:3000/hello-world/" para verificar a mensagem de retorno, ou acesse um ' +
    'navegador e entre com o endereço.');
});
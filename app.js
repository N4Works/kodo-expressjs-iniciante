'use strict';

var express = require('express');
var server = express();
var router = express.Router();

router
    .route('/')
    .get(function (requisicao, resposta, proximo) {
        return resposta.status(200).send('Hello World\n');
    });

server.use('/hello-world', router);

server.listen(3000, function () {
    console.log('Server rodando no endereço http://localhost:3000.');
    console.log('Execute o comando "curl http://localhost:3000/hello-world/" para verificar a mensagem de retorno, ou acesse um ' +
    'navegador e entre com o endereço.');
});
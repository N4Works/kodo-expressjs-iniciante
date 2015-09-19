"use strict";

// Importa a dependência referente ao ExpressJS
import express = require("express");
import bodyParser = require("body-parser");
// Cria um server baseado no ExpressJS
var server: express.Application = express();
// Obtém o objeto necessário para criação de rotas
var router: express.Router = express.Router();

var nomes:Array<string> = new Array<string>();

// Implementa a rota relativa "/" com o método "GET"
router
.route("/")
// @requisicao: O objeto requisição, contém os dados inseridos na requisição, parâmetros, json, arquivos, enfim,
// qualquer coisa enviada ao servidor
// @resposta: A resposta é utilizada para retornar valores ao sistema que chamou o método
// @proximo: Esse parâmetro é um método utilizado para chamar a próxima camada de funções do ExpressJS, por padrão,
// a próxima camada é o tratamento de erro do ExpressJS
.get(
    // Configuro um conversor de JSON nesta rota relativa
    bodyParser.json({}),
    // Aqui, nós indicamos que o HTTP Status da resposta será 200, ou seja, OK, e que será enviada a mensagem
    // "Hello World" com uma quebra de linha ao final
    (requisicao: express.Request, resposta: express.Response, proximo: Function) => resposta.status(200).json(nomes));

router
.route("/:nome")
.get(
    (requisicao: express.Request, resposta: express.Response, proximo: Function) => {
    // Caso o nome esteja cadastrado, exibo um erro ao usuário.
    if (nomes.indexOf(requisicao.params.nome) != -1) {
        // A função próximo utilizada direciona para um captador de erros do NodeJS, onde os mesmos são exibidos
        // junto com a callstack tornando mais fácil identificar um bug.
        return proximo(new TypeError(`Nome ${requisicao.params.nome} já cadastrado.`));
    }
    // Adiciono o nome na lista de nomes.
    nomes.unshift(requisicao.params.nome);
    resposta.status(200).send(`Bem-vindo ao centro Hello World "${requisicao.params.nome}".\n`);
});

// Configurações da rota.
var port: number = 3000;
var endpoint: string = "/hello-world";

// Neste ponto, indico ao servidor que quando o cliente chamar a rota absoluta "/hello-world" no endereço
// "localhost:3000/hello-world", a rota criada acima deve ser utilizada
server.use(endpoint, router);

// Subo o servidor na porta 3000
server.listen(port, () => {
    // Ao subir o servidor, exibo as mensagens abaixo no terminal
    var endereco: string = "http://localhost:3000";
    console.log(`Servidor rodando no endereço ${endereco}`);
    console.log(`Acesse o endereço "${endereco}/hello-world/<nome>" para inserir um nome no centro Hello-World.`);
    console.log(`Acesse o endereço "${endereco}/hello-world/" para obter os nomes cadastrados no centro.`);
});

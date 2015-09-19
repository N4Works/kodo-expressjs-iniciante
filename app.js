"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var server = express();
var router = express.Router();
var nomes = [];
router
    .route("/")
    .get(bodyParser.json({}), function (requisicao, resposta, proximo) { return resposta.status(200).json(nomes); });
router
    .route("/:nome")
    .get(function (requisicao, resposta, proximo) {
    if (nomes.indexOf(requisicao.params.nome) != -1) {
        return proximo(new TypeError("Nome " + requisicao.params.nome + " j\u00E1 cadastrado."));
    }
    nomes.unshift(requisicao.params.nome);
    resposta.status(200).send("Bem-vindo ao centro Hello World \"" + requisicao.params.nome + "\".\n");
});
var port = 3000;
var endpoint = "/hello-world";
server.use(endpoint, router);
server.listen(port, function () {
    var endereco = "http://localhost:3000";
    console.log("Server rodando no endere\u00E7o " + endereco);
    console.log("Execute o comando \"curl " + endereco + "/hello-world/\" para verificar a mensagem de retorno, ou acesse um navegador e entre com o endere\u00E7o.");
});

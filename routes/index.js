const fs = require('fs').promises;
const express = require('express');

const routes = express.Router();
const talkerJson = 'talker.json';

const HTTP_OK_STATUS = 200;

routes.get('/talker', async (request, response) => {
    const rotaDados = await fs.readFile(talkerJson);
    const talker = JSON.parse(rotaDados);

    if (!talker) {
        const resposta = response.status(HTTP_OK_STATUS).json(talker);
        return resposta;
    }

    const resposta = response.status(HTTP_OK_STATUS).json(talker);
    return resposta;
  });

  module.exports = routes;
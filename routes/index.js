const fs = require('fs').promises;
const express = require('express');

const talkerJson = 'talker.json';
const routes = express.Router();

const HTTP_OK_STATUS = 200;

routes.get('/talk', async (request, response) => {
    const rotaDados = await fs.readFile(talkerJson);
    const talker = JSON.parse(rotaDados);

    if (!talker) {
        response.status(HTTP_OK_STATUS).json(talker);
    }

    response.status(HTTP_OK_STATUS).json(talker);
  });

  module.exports = routes;
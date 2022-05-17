const fs = require('fs').promises;
const express = require('express');

const routes = express.Router();
const talkerJson = 'talker.json';

const HTTP_OK_STATUS = 200;

routes.get('/talk', async (request, response) => {
    const rotaDados = await fs.readFile(talkerJson);
    const talker = JSON.parse(rotaDados);

    if (!talker) {
        return response.status(HTTP_OK_STATUS).json(talker);
    }

    return response.status(HTTP_OK_STATUS).json(talker);
  });

  module.exports = routes;
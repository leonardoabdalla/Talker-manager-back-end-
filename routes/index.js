const fs = require('fs').promises;
const express = require('express');

const routes = express.Router();

const HTTP_OK_STATUS = 200;

routes.get('/talker', async (req, res) => {
    const rotaDados = await fs.readFile('talker.json');
    const talker = JSON.parse(rotaDados);

    if (!talker) {
        const resposta = res.status(HTTP_OK_STATUS).json(talker);
        return resposta;
    }

    const resposta = res.status(HTTP_OK_STATUS).json(talker);
    return resposta;
  });

routes.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    res.status(HTTP_OK_STATUS).json({ id });
    const rotaDados = await fs.readFile('talker.json');
    const talker = JSON.parse(rotaDados);

    if (!talker) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    return res.status(HTTP_OK_STATUS).json(talker);
});

module.exports = routes;
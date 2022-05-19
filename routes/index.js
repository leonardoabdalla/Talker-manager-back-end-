const fs = require('fs').promises;
const express = require('express');
const crypto = require('crypto');

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

    const rotaDados = await fs.readFile('talker.json');
    const talker = JSON.parse(rotaDados);

    const talkerUser = talker.find((t) => t.id === parseInt(id, 10));

    if (!talkerUser) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    return res.status(HTTP_OK_STATUS).json(talkerUser);
});

routes.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const validaEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    if ([email].includes(undefined)) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if ([password].includes(undefined)) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
        }
    if (!email.match(validaEmail)) {
        return res.status(400)
        .json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    const token = crypto.randomBytes(8).toString('hex');
    return res.status(200).json({ token });    
});

module.exports = routes;
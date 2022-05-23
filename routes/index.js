const fs = require('fs').promises;
const express = require('express');
const crypto = require('crypto');
const authMiddleware = require('./authMiddleware');
const namePost = require('./namePost');
const agePost = require('./agePost');
const talkPost = require('./talkPost');
const talkWatchedAt = require('./talkWatchedAt');
const talkRate = require('./talkRate');

const talkerJson = 'talker.json';

const routes = express.Router();
const HTTP_OK_STATUS = 200;
routes.get('/talker', async (req, res) => {
    const rotaDados = await fs.readFile(talkerJson);
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
    const rotaDados = await fs.readFile(talkerJson);
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

routes.post('/talker', authMiddleware, namePost, agePost, talkPost, talkWatchedAt, talkRate,
async (req, res) => {
    try {
        const { name, age, talk: { watchedAt, rate } } = req.body;
        const rotaDados = await fs.readFile(talkerJson);
        const talker = JSON.parse(rotaDados);
        const id = parseInt(talker.length + 1, 10);
        talker.push({ name, age, id, talk: { watchedAt, rate } });
        await fs.writeFile(talkerJson, JSON.stringify(talker));
        return res.status(201).json({ name, age, id, talk: { watchedAt, rate } });
    } catch (error) {
        console.log(error);
        return res.status(500).end();
    }
});

routes.put('/talker/:id', 
authMiddleware, namePost, agePost, talkPost, talkWatchedAt, talkRate, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age, talk } = req.body;
        const rotaDados = await fs.readFile('talker.json');
        const talker = JSON.parse(rotaDados); 
        const talkerUserIndex = talker.findIndex((t) => t.id === parseInt(id, 10));
        // talker[talkerUserIndex].id = talkerUserIndex;
        talker[talkerUserIndex].name = name;
        talker[talkerUserIndex].age = age;
        talker[talkerUserIndex].talk.watchedAt = talk.watchedAt;
        talker[talkerUserIndex].talk.rate = talk.rate;
        // talker.splice(talkerUserIndex, 1);
        const newTalker = [...talker, talker[talkerUserIndex]];
        await fs.writeFile(talkerJson, JSON.stringify(newTalker));
        return res.status(200).json(newTalker[talkerUserIndex]); 
    } catch (error) {
        return res.status(500).end();
    }
});

routes.delete('/talker/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;

    const rotaDados = await fs.readFile(talkerJson);
    const talker = JSON.parse(rotaDados);

    const talkerUser = talker.findIndex((t) => t.id === parseInt(id, 10));
    if (talkerUser === -1) {
    res.status(404).json({ message: 'Recipe not found!' });
    }
    talker.splice(talkerUser, 1);
    await fs.writeFile(talkerJson, JSON.stringify(talker));
    res.status(204).end();
});

module.exports = routes;
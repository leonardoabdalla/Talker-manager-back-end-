const talkPost = (req, res, next) => {
    try {
        const { talk } = req.body;
        if (!talk) {
            return res.status(400).json({ message: 
                'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
        }
        return next();
    } catch (error) {
        return res.status(500).end();
    }
};

module.exports = talkPost;
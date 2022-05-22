const talkWatchedAt = (req, res, next) => {
    try {
        const { talk: { watchedAt } } = req.body;
        const formatoDataRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        // console.log(rate) console.log(typeOf rate)
        if (!watchedAt) {
            return res.status(400).json({ message: 
                'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
        }
        if (!watchedAt.match(formatoDataRegex)) {
            return res.status(400).json({ message: 
                'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
        }
        return next();
    } catch (error) {
        return res.status(500).end();
    }
};

module.exports = talkWatchedAt;
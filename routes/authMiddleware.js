const authMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if ([authorization].includes(undefined)) {
           return res.status(401).json({ message: 'Token não encontrado' });
        }
        if (authorization.length !== 16 || authorization.length < 6) {
            return res.status(401).json({ message: 'Token inválido' });
        }
        return next();
    } catch (error) {
        return res.status(500).end();
    }
};

module.exports = authMiddleware;
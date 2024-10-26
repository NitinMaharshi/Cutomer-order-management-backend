const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

module.exports.authMiddleware = async (req, res, next) => {
    let authorization = req.header('Authorization');
    if (authorization) {
        const token = authorization.split('Bearer ')[1];
        if (!token) {
            return res.status(401).send({ statusCode: 401, message: 'Token is required.', data: [] });
        }

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(401).send({ statusCode: 401, message: 'User not found.', data: [] });
            }

            req.user = user;
            next();

        } catch (error) {
            return res.status(401).send({ statusCode: 401, message: 'Invalid token.', data: [] });
        }
    } else {
        return res.status(401).send({ statusCode: 401, message: 'Token is required.', data: [] });
    }
};

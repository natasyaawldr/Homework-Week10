const jwt = require('jsonwebtoken');
const { key } = require('../secretKey');

const verify = (req, res, next) => {
    const token = req.header('authorization');
    
    if (!token || token === 'undefined') {
        return res.status(401).json({ message: "No token provided!" });
    }

    jwt.verify(token, key, (err, signature) => {
        if (err) {
            res.status(401).json({ message: "Invalid signature!" });
        } else {
            req.userData = {
                id: signature.id,
                email: signature.email,
                role: signature.role
            };
            next();
        }
    });
};

module.exports = verify;
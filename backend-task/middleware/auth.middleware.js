const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
const authorization = req.headers.authorization;
const [schema, token] = authorization
? authorization.split(' ')
: [];

if (schema !== 'Bearer' || !token) {
    return res.status(401).json({
        message: 'Authorization token is required!'
    });
}

const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
    console.error('JWT_SECRET is missing');
    return res.status(500).json({
        message: 'Internal server error'
    });
}

try {
    req.user = jwt.verify(token, secretKey);
    console.log('JWT verified successfully');
    return next();
} catch (error) {
    console.error('JWT verification failed:', error.name);
    console.error('Reason:', error.message);

    return res.status(401).json({
        message: 'The token is either expired or invalid!'
    });
}

}

module.exports = authMiddleware;

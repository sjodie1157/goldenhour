import jwt from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';

const { sign, verify } = jwt

function createToken(user, expire=null){
    return sign({
        username: user.userName,
        email: user.userEmail,
        role: user.userRole
    },
    process.env.SECRET_KEY,
    {
        expiresIn: (expire) ? expire : "1h"
    })
}
function verifyAToken(token){
    return verify(token, process.env.SECRET_KEY);
}

export {
    createToken,
    verifyAToken
}
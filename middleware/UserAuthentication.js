import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const { sign, verify } = jwt

function createToken(user, expire=null){
    console.log(expire)
    return sign(
    user,
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
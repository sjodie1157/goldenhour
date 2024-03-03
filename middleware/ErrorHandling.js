import { code } from '../model/index.js';
import jwt from 'jsonwebtoken';

const { JsonWebTokenError } = jwt;

function handleRequestError(err, req, res, next){
    if( err ){
        console.log(err)
    }
    switch( res.statusCode ){
        case code.NOTFOUND:
            res.json({
                status: code.NOTFOUND,
                msg: "Not Found"
            });
            next();
            break;
    }
}
function handleAuthError(err, req, res, next){}

export {
    handleRequestError,
    handleAuthError
}
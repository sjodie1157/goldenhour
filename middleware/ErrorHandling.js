import { code } from '../model/index.js';
import jwt from 'jsonwebtoken';

const { JsonWebTokenError, TokenExpiredError } = jwt;

function DatabaseErrorHandling(err, req, res){
    console.log("DatabaseErrorHandling: ", err);
}

function ServerErrorHandling(err, req, res, next){
    console.log("ServerErrorHandling: ", err)
}

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
function handleAuthError(err, req, res){
    switch( true ){
        case err instanceof TokenExpiredError:
            res.status(code.UNAUTHORIZED).send({
                status: code.UNAUTHORIZED,
                msg: "Token expired"
            });
            break;
        case err instanceof JsonWebTokenError:
            res.status(code.UNAUTHORIZED).send({
                status: code.UNAUTHORIZED,
                msg: "Token invalid"
            });
            break;
        default:
            break;
    }
}

export {
    handleRequestError,
    handleAuthError,
    ServerErrorHandling,
    DatabaseErrorHandling
}
import {
    connection as db
} from '../config/index.js';
import {
    mail
} from '../middleware/MailingService.js';
import {
    createToken,
    verifyAToken
} from '../middleware/UserAuthentication.js';
import {
    hash,
    compare,
    compareSync,
    hashSync
} from 'bcrypt';
import {
    code
} from '../model/index.js';
import {
    config
} from 'dotenv';
import util from 'util';
import url from 'url';
import { handleAuthError } from '../middleware/ErrorHandling.js';

config();

const PROTO = process.env.HTTP;
const ROUNDS = +process.env.ROUNDS;
const APP_DOMAIN = process.env.APP_DOMAIN;

const dbAsync = util.promisify(db.query).bind(db);
class User {
    // admin will be able to block/unblock users even suspend(ban);
    // privs are: user, premium(can have a video on there profile), admin
    fetchUser(req, res) {
        // this function will fetch the user using this function if privledges is user.
        // admin can fetch any user
        let token = req.cookies.token;

        if (!token) {
            res.status(code.UNAUTHORIZED).send({
                status: code.UNAUTHORIZED,
                msg: "no account"
            })
            return;
        }

        try {
            verifyAToken(token);
        } catch (e) {
            console.log(e)
        }
        res.status(200).send({
            status: 200,
            token,
            msg: "token found"
        })
    }
    fetchUsers(req, res) {
        // only admin can use this function
    }
    async createUser(req, res) {
        // can only create user accounts
        // account has to be upgraded to premium
        // age restriction, 13+
        let data = req.body;
        let deviceIP = req.socket.remoteAddress;

        if( !data.username || !data.email || !data.password || typeof data.age != 'number' ){
            res.status(code.BADREQUEST).send({
                status: code.BADREQUEST,
                msg: "Invalid information provided"
            });
            return;
        }

        const emailCheck = `SELECT userEmail FROM Users WHERE userEmail = ?;`;

        let result = await dbAsync(emailCheck, [data.email]);
        console.log('email check result: ', result)

        if( result.length > 0 ){
            res.status(code.FORBIDDEN).send({
                status: code.FORBIDDEN,
                msg: "account already exists"
            })
            return;
        }

        data.password = await hash(data.password, ROUNDS);

        let token = createToken({
            userName: data.username,
            userEmail: data.email,
            userPass: data.password.toString(),
            userAge: data.age,
            userRole: 'user'
        }, '10m');

        // token to check if the url is still valid
        let redirectUrl = `${PROTO}://${APP_DOMAIN}/verify?token=${token}`;

        mail(
            data.email,
            "Please confirm your email address",
            "This message is sent to you by capstonebud app.",
            `<a href='${redirectUrl}'>Verify Email</a>`
        );

        res.status(code.SEEOTHER).send({
            status: code.SEEOTHER,
            msg: "email sent, please confirm this is your email address"
        })
    }
    verifyUserEmail(req, res) {
        let {token} = req.body;

        try {
            let user = verifyAToken(token);
            console.log(user);
            // put the user into the database.
            let qry = `INSERT INTO Users SET ?`;

            let payload = {
                userName: user.userName,
                userEmail: user.userEmail,
                userPass: user.userPass.toString(),
                userAge: user.userAge,
                userRole: user.userRole
            }

            
            db.query(qry, [payload], (err)=>{
                if(err) throw err

                delete payload['userPass'];
                token = createToken(payload, '7d');
                res.json({
                    username: user.userName,
                    email: user.userEmail,
                    age: user.userAge,
                    role: user.userRole,
                    token
                })

            })
            // return a session token
        } catch(e) {
            console.log(e)
            handleAuthError(e, req, res);
        }

    }
    async updateUser(req, res) {
        // post the token
        let data = req.body;

        if( !data.token ){
            res.status(code.UNAUTHORIZED).send({
                status: code.UNAUTHORIZED,
                msg: "Token is invalid"
            })
        }

        if( data.password ) data.password = await hash( data.password, ROUNDS );
        // what if they use the verify token
        try {
            let user = verifyAToken(data.token)
            // check if the user is in the database
            const emailCheck = `SELECT userID, userEmail, userName, userPass, userAge, userRole FROM Users WHERE userEmail = ?;`;
            delete data[data.token];

            let payload = {
                userName: data.username,
                userPass: data.password,
                userAge: data.age,
                userProfile: data.profile,
            }

            for(let key in payload){
                if( !payload[key] ){
                    delete payload[key];
                }
            }
            
            let result = await dbAsync(emailCheck, [user.email]);
            // console.log('email check result: ', result)
            if( result.length > 0 ){
                let { userID, userName, userEmail, userAge, userRole } = result[0]

                let new_token = createToken(
                    {
                        username: userName, 
                        email: userEmail, 
                        age: userAge, 
                        role: userRole
                    }
                );

                const updateProfile = `UPDATE Users SET ? WHERE userID = ${userID};`;
                await dbAsync(updateProfile, [payload])
                
                // send a new token back and blacklist the old one
                const blacklistToken = `INSERT INTO BlacklistTokens SET token = ?, userID = ?`
                await dbAsync(blacklistToken, [data.token, userID]);

                res.status(code.OK).send({
                    status: code.OK,
                    msg: "Account updated",
                    new_token
                })
            } else {
                res.status(code.UNAUTHORIZED).send({
                    status: code.UNAUTHORIZED,
                    msg: "Account does not exist"
                })
            }
        } catch(e) {
            console.log(e);
            handleAuthError(e, req, res);
            return;
        }
    }
    async deleteUser(req, res) {
        // there has to be a token here, if not then how did they get here without login
        let {token, password} = req.body

        if( !token || !password || typeof password != 'string' ) {
            res.status(code.UNAUTHORIZED).send({
                status: code.UNAUTHORIZED,
                msg: "Please make sure you provided your token and password"
            })
        }

        try {
            let user = verifyAToken(token);
            // now we need to delete the account
            const getPassword = `SELECT userPass FROM Users WHERE userEmail = ?`;
            const deleteAccount = `DELETE FROM Users WHERE userEmail = ?;`;
            let result = await dbAsync(getPassword, [user.email]);
            if( result.length > 0 ){
                password = await hash(password, 10);
                let correctPass = compareSync( password, result[0].userPass );
                console.log(correctPass)
                if( correctPass ) {
                    await dbAsync(deleteAccount, [user.email]);
                    res.status(code.OK).send({
                        status: code.OK,
                        msg: "Account deleted"
                    })
                } else {
                    res.status(code.UNAUTHORIZED).send({
                        status: code.UNAUTHORIZED,
                        msg: "Password in incorrect"
                    })
                }
            } else {
                res.status(code.NOTFOUND).send({
                    status: code.NOTFOUND,
                    msg: "Account does not exist"
                })
            }
        } catch(e) {
            console.log(e);
            handleAuthError(e, req, res);
        }
    }
    async login(req, res) {
        let data = req.body;

        try {
            if( data.token ){
                let user = verifyAToken( data.token );
                user.msg = "User logged in";
                res.status(200).send(user);
            } else {
                const getAccount = `SELECT * FROM Users WHERE userEmail = ?;`
                
                let result = await dbAsync(getAccount, [data.email])
                if( result.length > 0 ){
                    let correctPass = compareSync(data.password, result[0].userPass);
                    if( correctPass ){
                        let user = {
                            username: result[0].userName,
                            email: result[0].userEmail,
                            age: result[0].userAge,
                            role: result[0].userRole,
                            profile: result[0].userProfile
                        }
                        let token = createToken( user, '7d' );

                        res.status(code.OK).send({
                            status: code.OK,
                            msg: "User logged in",
                            token
                        })
                    } else {
                        res.status(code.UNAUTHORIZED).send({
                            status: code.UNAUTHORIZED,
                            msg: "Invalid password or email Address"
                        })
                    }
                } else {
                    res.status(code.UNAUTHORIZED).send({
                        status: code.UNAUTHORIZED,
                        msg: "User account does not exist."
                    })
                }
            }
        } catch(e) {
            console.log(e);
            handleAuthError(e, req, res);
        }
        // will login user and retrieve a jwt session that will by default expire in 1 hr unless set to 30days or a week
    }
    logout(req, res) {
        // there has to be a token here, if not then how did they get here without login
        // this will blacklist a jwt token until it expires
        let {token} = req.body;

        console.log(token);
        // this will logout the user
    }
    upgradeUser(req, res) {
        // can only upgrade to premium user
        // premium user can have videos on their profiles
        // advanced profiles
    }
    getLoggedInDevices(req, res) {
        // gets device ip and device info
    }
    forgotPassword(req, res) {
        res.json({
            status: 200,
            msg: "email will be sent soon."
        })
        // mail()
    }

}

export {
    User
}
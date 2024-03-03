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
    genSalt
} from 'bcrypt';
import {
    code
} from '../model/index.js';
import {
    config
} from 'dotenv';
import util from 'util';
import url from 'url';

config();

const PROTO = process.env.HTTP;
const ROUNDS = +process.env.ROUNDS;

const dbAsync = util.promisify(db.query).bind(db);
class User {
    // admin will be able to block/unblock users even suspend(ban);
    // privs are: user, premium(can have a video on there profile), admin
    fetchUser(req, res) {
        // this function will fetch the user using this function if privledges is user.
        // admin can fetch any user
        let token = req.cookies.authToken;

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

        if( !data.username || !data.email || !data.password || !data.age ){
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
            userPass: data.password,
            userAge: data.age,
            userRole: 'user'
        }, '10m');

        // token to check if the url is still valid
        let redirectUrl = `${PROTO}://${req.headers.host}/account/signup?token=${token}`;

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
        let params = url.parse(req.url, true).query;
        let token = params.token;
        let ip = params.ip;
        let action = ''
        console.log()

        res.json({
            action,
            token,
            ip
        })
    }
    updateUser(req, res) {
        // appropriate user can only update fields themselves
    }
    deleteUser(req, res) {
        // appropriate user can delete themselves
    }
    login(req, res) {
        // get device info on login
        // will login user and retrieve a jwt session that will by default expire in 1 hr unless set to 30days or a week
    }
    logout(req, res) {
        // this will logout the user
        // this will blacklist a jwt token if not yet expired
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
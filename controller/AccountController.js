import express from 'express';
import { user } from '../model/index.js';
import bodyParser from 'body-parser';
import url from 'url';

const accountRouter = express.Router();

accountRouter.get('/', (req, res)=>{
    try {
        user.fetchUser(req, res);
    } catch(e) {
        console.log(e)
    }
})
accountRouter.post('/signup', bodyParser.json(), (req, res)=>{
    try {
        user.createUser(req, res);
    } catch(e) {
        console.log(e);
    }
});
accountRouter.get('/signup', (req, res)=>{
    // /signup?token=:token&ip=:ip
    try {
        user.verifyUserEmail(req, res);
    } catch(e){
        console.log(e)
    }
})
accountRouter.post('/login', bodyParser.json(), (req, res)=>{
    res.json({
        msg: "trying to login"
    })
});
accountRouter.get('/reset?verify=:token&ip=:ip', (req, res)=>{
    let resetToken = req.params.token;
    let deviceIP = req.params.ip;
    let actualIP = req.ip;
    res.json({
        resetToken,
        deviceIP,
        actualIP,
    })
});
accountRouter.get('/forgot-password', (req, res)=>{
    try {
        user.forgotPassword(res, res);
    } catch(e) {
        res.json({
            status: 200,
            msg: "email will be sent soon."
        })
    }
})


export {
    accountRouter
}
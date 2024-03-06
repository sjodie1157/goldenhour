import express from 'express';
import { user } from '../model/index.js';
import bodyParser from 'body-parser';

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
accountRouter.post('/verify', (req, res)=>{
    try {
        user.verifyUserEmail(req, res);
    } catch(e){
        console.log(e)
    }
})
accountRouter.post('/login', bodyParser.json(), (req, res)=>{
    try {
        user.login(req, res);
    } catch(e) {
        console.log(e)
        // handle general errors here.
    }
});
accountRouter.delete('/deleteaccount', bodyParser.json(), (req, res)=>{
    try {
        user.deleteUser(req, res);
    } catch(e) {
        console.log(e);
    }
})
accountRouter.patch('/updateaccount', bodyParser.json(), (req, res)=>{
    try {
        user.updateUser(req, res);
    } catch(e) {
        console.log(e)
    }
})
accountRouter.post('/reset', (req, res)=>{
    let resetToken = req.params.token;
    let deviceIP = req.params.ip;
    let actualIP = req.ip;
    res.json({
        resetToken,
        deviceIP,
        actualIP,
    })
});
accountRouter.post('/forgot-password', (req, res)=>{
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
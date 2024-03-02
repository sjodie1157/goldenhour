import express from 'express';
import { user } from '../model/index.js';

const accountRouter = express.Router();

accountRouter.get('/', (req, res)=>{
    try {
        res.json({
            status: 200,
            msg: "this is where you manage/create your account"
        })
    } catch(e) {
        console.log(e)
    }
})
accountRouter.post('/', (req, res)=>{});
accountRouter.get('/?reset=:token', (req, res)=>{});
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
import express from 'express';
import { user } from '../model/index.js';
import bodyParser from 'body-parser';

const userRouter = express.Router();
const usersRouter = express.Router();

usersRouter.get('/', (req, res)=>{
    try {
        user.fetchUsers(req, res);
    } catch(e) {
        console.log(e)
    }
})

userRouter.get('/:userID', (req, res)=>{
    try {
        user.fetchUser(req, res)
    } catch(e) {
        console.log(e)
    }
})
// userRouter.post('/register', bodyParser.json(), (req, res)=>{
//     try {
//         user.createUser(req, res);
//     } catch(e) {
//         console.log(e);
//     }
// });
userRouter.patch('/:userID', bodyParser.json(), (req, res)=>{
    try {
        user.updateUser(req, res)
    } catch(e) {
        console.log(e)
    } 
})
// userRouter.post('/login', bodyParser.json(), (req, res)=>{
//     try {
//         user.login(req, res);
//     } catch(e) {
//         console.log(e)
//         // handle general errors here.
//     }
// });
userRouter.delete('/:userID', (req, res)=>{
    try {
        user.deleteUser(req, res);
    } catch(e) {
        console.log(e);
    }
})
userRouter.post('/verify', (req, res)=>{
    try {
        user.verifyUserEmail(req, res);
    } catch(e){
        console.log(e)
    }
})
userRouter.post('/reset', (req, res)=>{
    try {
        user.resetPassword(req, res);
    } catch(e) {
        console.log(e)
    }
});
userRouter.post('/forgot-password', (req, res)=>{
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
    userRouter,
    usersRouter
}
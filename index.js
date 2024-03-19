import express from 'express';
import {
    config
} from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {
    userRouter, usersRouter
} from './controller/UserController.js';
import { postRouter, postsRouter } from './controller/PostsController.js';
import {
    handleRequestError
} from './middleware/ErrorHandling.js';
import { user } from './model/index.js';

config();

const PORT = +process.env.PORT || 5000;

const app = express();

app.use((req, res, next) => {
    // req.header("Access-Control-Allow-Origin", "capstonebud.web.app");
    // req.header("Access-Control-Allow-Methods", "POST, GET");
    next();
})

var corsOptions = {
    origin: 'https://capstonebud.web.app',
    optionsSuccessStatus: 200
}

app.use(
    express.static('./static'),
    express.json(),
    express.urlencoded({
        extended: true
    }),
    cookieParser(),
    cors()
)

app.post('/login', (req, res)=>{
    try {
        user.login(req, res);
    } catch(e) {
        console.log(e)
    }
})
app.post('/register', (req, res)=>{
    try {
        user.createUser(req, res);
    } catch(e) {
        console.log(e)
    }
})
app.get('/verify', (req, res)=>{
    try {
        user.verifyUserEmail(req, res);
    } catch(e) {
        console.log(e)
    }
})

app.use('/user', userRouter);
app.use('/users', usersRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouter);

app.use(handleRequestError);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
import express from 'express';
import {
    config
} from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { accountRouter } from './controller/AccountController.js';
import { handleRequestError } from './middleware/ErrorHandling.js';

config();

const PORT = +process.env.PORT || 4500;

const app = express();

app.use((req, res, next)=>{
    req.header("Access-Control-Allow-Origin", "capstonebud.web.app");
    req.header("Access-Control-Allow-Methods", "POST, GET");
    next();
})
app.use(
    express.static('./static'),
    express.json(),
    express.urlencoded({
        extended: true
    }),
    cookieParser(),
    cors()
)

app.use('/account', accountRouter);

app.use(handleRequestError);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
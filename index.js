import express from 'express';
import {
    config
} from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { accountRouter } from './controller/AccountController.js';

config();

const PORT = +process.env.PORT || 4500;

const app = express();
app.use(
    express.static('./static'),
    express.json(),
    express.urlencoded({
        extended: true
    }),
    cookieParser(),
    cors()
)

app.get('/', (req, res) => {
    console.log(req)
    res.json({
        status: 200,
        msg: "Social Media Backend coming soon!"
    })
})

app.use('/account', accountRouter);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
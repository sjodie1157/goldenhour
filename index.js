import express from 'express';
import {
    config
} from 'dotenv';
import {mail} from './middleware/MailingService.js'

config();

const PORT = +process.env.PORT || 4500;

const app = express();

app.get('/', (req, res) => {
    res.json({
        status: 200,
        msg: "Social Media Backend coming soon!"
    })
})



// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
const express = require('express');
const dotenv = require('dotenv')
const router = require('./routes/index');
const cors = require('cors');

const app = express();
dotenv.config();

const corsOptions = {
    // origin: 'https://si-laundry.netlify.app',
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json()); 
app.use(router);

app.get('/', (req, res) => {
    res.send('server up and running');
})

const port = process.env.PORT;
const host = process.env.HOST;

app.listen(port, host, () => {
    console.log(`server up and running at http://${host}:${port}`);
})

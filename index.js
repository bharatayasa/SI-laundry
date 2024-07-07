const express = require('express')
const dotenv = require('dotenv')

const app = express()
dotenv.config();

app.get('/', (req, res) => {
    res.send('server up and running'); 
})

const host = process.env.HOST;
const port = process.env.PORT;

app.listen(port, host, () => {
    console.log(`server up and running at http://${host}:${port}`);
})

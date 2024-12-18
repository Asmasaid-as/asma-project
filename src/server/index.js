const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');



dotenv.config();
const app = express()


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('dist'));

const api_url = 'https://api.meaningcloud.com/sentiment-2.1?';
const key = process.env.API_KEY;


app.get('/', function (req, res) {
   // res.sendFile(path.join(__dirname, '../client/views/index.html'))
    //res.sendFile(path.join(__dirname, 'dist/index.html'))
    res.sendFile('dist/index.html');
    
});

app.get('/test', function (req, res) {
    res.status(200).send('OK');
     
 });

app.post('/api', async function(req, res) {
    const url = req.body.url;
    console.log('URL received:', url);
    const apiURL = `${api_url}key=${key}&url=${url}&lang=en`

    try {
    const response = await fetch(apiURL)
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json()
    console.log(data)
    res.send(data)
}catch (error)
{
    console.error('Error: ', error);
}

});

app.listen(3000, function () {
    console.log('App Running on Port 3000');
});

module.exports = app;
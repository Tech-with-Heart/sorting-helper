const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

const app = express();
const pointRoute = require('./routes/point');
const db = mongoose.connection;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    next();
});
app.use('/point', pointRoute);

app.get('/', (req, res) => {
    res.send('Welcome in sorting-helper app!');
});

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connection Successful!');
});

process.on('SIGINT', () => {
    mongoose.connection.close();
});

app.listen(3000);

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const auth = require('./middleware/auth');
const cors = require('cors');

const app = express();
const fakeDataRoutes = require('./routes/fake-data');

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOSTNAME, MONGO_PORT, MONGO_DB } =
    process.env;

let url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(cors());

app.use('/api/fake-data', fakeDataRoutes);

console.log('INIT CONNECTION TO MONGO!', url);

mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(8080, () => {
            console.log('LISTEING!');
        });
    })
    .catch((err) => console.log(err));

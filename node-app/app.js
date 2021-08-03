const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const auth = require('./middleware/auth');
const cors = require('cors');

const app = express();
const fakeDataRoutes = require('./routes/fake-data');

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOSTNAME, MONGO_PORT, MONGO_DB } =
    process.env;

console.log(
    'Env values: ',
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
);

let url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(
    cors({
        origin: '*',
        allowedHeaders: [
            'Accept-Version',
            'Authorization',
            'Credentials',
            'Content-Type',
        ],
        methods: ['GET', 'PUT', 'POST'],
    })
);
// app.use('/feed', feedRoutes);
// app.use('/auth', authRoutes);

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader(
//         'Access-Control-Allow-Methods',
//         'OPTIONS, GET, POST, PUT, PATCH, DELETE'
//     );
//     res.setHeader(
//         'Access-Control-Allow-Headers',
//         'Content-Type, Authorization'
//     );
//     if (req.method === 'OPTIONS') {
//         return res.sendStatus(200);
//     }
//     next();
// });

app.use('/api', fakeDataRoutes);

console.log('INIT CONNECTION TO MONGO!', url);

mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(8080, () => {
            console.log('LISTEING!');
        });
    })
    .catch((err) => console.log(err));

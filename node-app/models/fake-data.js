const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fakeDataSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('FakeData', fakeDataSchema);

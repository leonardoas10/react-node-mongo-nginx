const FakeData = require('../models/fake-data');
const jwt = require('jsonwebtoken');

exports.get = async (req, res, next) => {
    try {
        const fakeData = await FakeData.find();
        const documents = await FakeData.find().countDocuments();
        if (documents == 0) {
            const newFakeData = await new FakeData({ name: 'leonardo!' });
            const fake = await newFakeData.save();
            console.log('new fake-data');
            return res.status(201).json({ fakeData: fake });
        }

        return res
            .status(201)
            .json({ fakeData: fakeData, testEnv: 'testEnv!!' });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const username = req.body.username;
        // const password = req.body.password;
        const user = await FakeData.findOne({ username: username });
        if (!user) {
            const error = new Error(
                'Validatiopn failed, entered data is incorrect'
            );
            error.statusCode = 401;
            error.data = errors.array();
            throw error;
        }
        // const checkPassword = await bcrypt.compare(password, user.password);

        // if (!checkPassword) {
        //     const error = new Error('Wrong password');
        //     error.statusCode = 401;
        //     error.data = errors.array();
        //     throw error;
        // }
        const token = jwt.sign(
            {
                username: user.username,
                userId: user._id.toString(),
            },
            'secret',
            {
                expiresIn: '1h',
            }
        );
        res.status(200).json({ token: token, userId: user._id.toString() });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

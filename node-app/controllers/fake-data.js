const FakeData = require('../models/fake-data');

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

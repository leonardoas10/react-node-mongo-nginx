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

exports.user = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        console.log('userId +> ', userId);
        const user = await FakeData.findOne({ _id: userId });
        if (!user) {
            const error = new Error(
                'Validatiopn failed, entered data is incorrect'
            );
            error.statusCode = 401;
            throw error;
        }
        res.status(200).json({ user: user });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.editUser = async (req, res, next) => {
    try {
        const payload = req.body.payload;
        console.log('Payload => ', payload);
        const user = await FakeData.findOne({ _id: payload._id });
        if (!user) {
            const error = new Error(
                'Validatiopn failed, entered data is incorrect'
            );
            error.statusCode = 401;
            throw error;
        }

        user.username = payload.username;
        user.password = payload.password;
        user.country = payload.country;
        user.age = payload.age;
        user.role = payload.role;
        user.hobby = payload.hobby;

        user.save();

        res.status(200).json({ user: user });

        // Product.findById(prodId)
        // .then(product => {
        //   if (product.userId.toString() !== req.user._id.toString()) {
        //     return res.redirect('/');
        //   }
        //   product.title = updatedTitle;
        //   product.price = updatedPrice;
        //   product.description = updatedDesc;
        //   if (image) {
        //     fileHelper.deleteFile(product.imageUrl);
        //     product.imageUrl = image.path;
        //   }
        //   return product.save().then(result => {
        //     console.log('UPDATED PRODUCT!');
        //     res.redirect('/admin/products');
        //   });
        // })
        // .catch(err => {
        //   const error = new Error(err);
        //   error.httpStatusCode = 500;
        //   return next(error);
        // });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

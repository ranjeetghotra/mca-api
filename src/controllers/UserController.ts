import UserModel from '../models/UserModel';

/**
 * UserController.ts
 *
 * @description :: Server-side logic for managing Users.
 */
export = {

    /**
     * UserController.login()
     */
    login: async function (req, res) {

        try {
            let user = await UserModel.findOne({ email: req.body.email })
            if(!user?.verified) {
                return res.status(400).json({ message: 'User not verified', errors: [] })
            } else if(!user?.active) {
                return res.status(400).json({ message: 'User not active', errors: [] })
            } else if (req.params.type === 'admin' && user.role !==2) {
                return res.status(400).json({ message: 'User don\'t have admin permission', errors: [] })
            } else if (!!user || user.validPassword(req.body.password)) {
                const token = user.generateJwt();
                return res.status(201).json({ code: 201, token, data: user.profile(), message: 'Signup successful', errors: [] })
            }
            return res.status(400).json({ message: 'User not found', errors: [] })
        } catch (err) {
            console.log(err)
            return res.status(400).json({ message: 'Registration Failed', errors: [err.message] })
        }
    },

    /**
     * UserController.register()
     */
    register: async function (req, res) {

        try {
            let checkUser = await UserModel.findOne({ countryCode: req.body.countryCode, phone: req.body.phone })
            if (checkUser) {
                return res.status(400).json({ message: 'User already exist', errors: [] })
            }
            checkUser = await UserModel.findOne({ email: req.body.email })
            if (checkUser) {
                return res.status(400).json({ message: 'User already exist', errors: [] })
            }
            const data = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                countryCode: req.body.countryCode,
                phone: req.body.phone,
            };
            let user = new UserModel(data);
            user.setPassword(req.body.password)
            user = await user.save();
            const token = user.generateJwt();

            // messageService.sendWelcomeSMS('+91' + user.phone);
            return res.status(201).json({ code: 201, data: user.profile(), message: 'Signup successful', errors: [] })
        } catch (err) {
            return res.status(400).json({ message: 'Registration Failed', errors: [err.message] })
        }
    },

    /**
     * UserController.list()
     */
    list: function (req, res) {
        UserModel.find((err, Users) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting User.',
                    error: err
                });
            }

            return res.json(Users);
        });
    },

    /**
     * UserController.show()
     */
    show: function (req, res) {
        const id = req.params.id;

        UserModel.findOne({ _id: id }, (err, User) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting User.',
                    error: err
                });
            }

            if (!User) {
                return res.status(404).json({
                    message: 'No such User'
                });
            }

            return res.json(User);
        });
    },

    /**
     * UserController.create()
     */
    create: function (req, res) {
        const User = new UserModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            countryCode: req.body.countryCode,
            phone: req.body.phone,
            type: req.body.type,
            verified: req.body.verified,
            active: req.body.active
        });

        User.save((err, User) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating User',
                    error: err
                });
            }

            return res.status(201).json(User);
        });
    },

    /**
     * UserController.update()
     */
    update: function (req, res) {
        const id = req.params.id;

        UserModel.findOne({ _id: id }, (err, User) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting User',
                    error: err
                });

            }
            if (!User) {
                return res.status(404).json({
                    message: 'No such User'
                });
            }

            User.firstName = req.body.firstName ? req.body.firstName : User.firstName;
            User.lastName = req.body.lastName ? req.body.lastName : User.lastName;
            User.email = req.body.email ? req.body.email : User.email;
            User.countryCode = req.body.countryCode ? req.body.countryCode : User.countryCode;
            User.phone = req.body.phone ? req.body.phone : User.phone;
            User.type = req.body.type ? req.body.type : User.type;
            User.verified = req.body.verified ? req.body.verified : User.verified;
            User.active = req.body.active ? req.body.active : User.active;

            User.save((err, User) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating User.',
                        error: err
                    });
                }

                return res.json(User);
            });
        });
    },

    /**
     * UserController.remove()
     */
    remove: function (req, res) {
        const id = req.params.id;

        UserModel.findByIdAndRemove(id, (err, User) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the User.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};

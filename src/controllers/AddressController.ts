import AddressModel from '../models/AddressModel';

/**
 * AddressController.ts
 *
 * @description :: Server-side logic for managing Addresss.
 */
export = {

    /**
     * AddressController.list()
     */
    list: function (req, res) {
        AddressModel.find({ user: req.user.id, deleted: { $ne: true } }, (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Address.',
                    error: err
                });
            }

            return res.json({ data });
        });
    },

    /**
     * AddressController.show()
     */
    show: function (req, res) {
        const id = req.params.id;

        AddressModel.findOne({ _id: id, user: req.user.id, deleted: { $ne: true } }, (err, Address) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Address.',
                    error: err
                });
            }

            if (!Address) {
                return res.status(404).json({
                    message: 'No such Address'
                });
            }

            return res.json(Address);
        });
    },

    /**
     * AddressController.create()
     */
    create: function (req, res) {
        const Address = new AddressModel({
            user: req.user.id,
            address: req.body.address,
            name: req.body.name,
            street: req.body.street,
            locality: req.body.locality,
            pincode: req.body.pincode,
            phone: req.body.phone,
        });

        Address.save((err, address) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Address',
                    error: err
                });
            }

            return res.status(201).json(address);
        });
    },

    /**
     * AddressController.update()
     */
    update: function (req, res) {
        const id = req.params.id;

        AddressModel.findOne({ _id: id }, (err, Address) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Address',
                    error: err
                });

            }
            if (!Address) {
                return res.status(404).json({
                    message: 'No such Address'
                });
            }
            Address.address = req.body.address ? req.body.address : Address.address;
            Address.name = req.body.name ? req.body.name : Address.name;
            Address.street = req.body.street ? req.body.street : Address.street;
            Address.locality = req.body.locality ? req.body.locality : Address.locality;
            Address.pincode = req.body.pincode ? req.body.pincode : Address.pincode;
            Address.phone = req.body.phone ? req.body.phone : Address.phone;

            Address.save((err, Address) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Address.',
                        error: err
                    });
                }

                return res.json(Address);
            });
        });
    },

    /**
     * AddressController.remove()
     */
    remove: async (req, res) => {
        const id = req.params.id;
        try {
            const address = await AddressModel.findOne({ _id: id })
            if (!address) {
                throw Error("Address not found")
            }
            address.deleted = true;
            await address.save()
            res.send({})
        } catch (err) {
            return res.status(500).json({
                message: 'Error when deleting the Address.',
                error: err.message || JSON.stringify(err)
            });
        }
    }
};

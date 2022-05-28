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
        AddressModel.find((err, Addresss) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Address.',
                    error: err
                });
            }

            return res.json(Addresss);
        });
    },

    /**
     * AddressController.show()
     */
    show: function (req, res) {
        const id = req.params.id;

        AddressModel.findOne({_id: id}, (err, Address) => {
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
			user : req.body.user,
			address : req.body.address,
			street : req.body.street,
			locality : req.body.locality,
			pincode : req.body.pincode,
			deleted : req.body.deleted
        });

        Address.save((err, Address) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Address',
                    error: err
                });
            }

            return res.status(201).json(Address);
        });
    },

    /**
     * AddressController.update()
     */
    update: function (req, res) {
        const id = req.params.id;

        AddressModel.findOne({_id: id}, (err, Address) => {
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

            Address.user = req.body.user ? req.body.user : Address.user;
			Address.address = req.body.address ? req.body.address : Address.address;
			Address.street = req.body.street ? req.body.street : Address.street;
			Address.locality = req.body.locality ? req.body.locality : Address.locality;
			Address.pincode = req.body.pincode ? req.body.pincode : Address.pincode;
			Address.deleted = req.body.deleted ? req.body.deleted : Address.deleted;
			
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
    remove: function (req, res) {
        const id = req.params.id;

        AddressModel.findByIdAndRemove(id, (err, Address) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Address.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};

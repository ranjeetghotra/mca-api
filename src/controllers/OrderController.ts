import OrderModel from '../models/OrderModel';

/**
 * OrderController.ts
 *
 * @description :: Server-side logic for managing Orders.
 */
export = {

    /**
     * OrderController.list()
     */
    list: function (req, res) {
        OrderModel.find((err, Orders) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Order.',
                    error: err
                });
            }

            return res.json(Orders);
        });
    },

    /**
     * OrderController.show()
     */
    show: function (req, res) {
        const id = req.params.id;

        OrderModel.findOne({_id: id}, (err, Order) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Order.',
                    error: err
                });
            }

            if (!Order) {
                return res.status(404).json({
                    message: 'No such Order'
                });
            }

            return res.json(Order);
        });
    },

    /**
     * OrderController.create()
     */
    create: async (req, res) => {
        try {
            let order = new OrderModel({
                user : req.body.user,
                address : req.body.address,
                products : req.body.products,
                shipping : req.body.shipping,
                subTotal : req.body.subTotal,
                status : req.body.status,
                discount : req.body.discount
            });
    
            order = await order.save();
            return res.status(201).json(order);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when creating Order',
                error: err
            });
        }
    },

    /**
     * OrderController.update()
     */
    update: function (req, res) {
        const id = req.params.id;

        OrderModel.findOne({_id: id}, (err, Order) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Order',
                    error: err
                });

            }
            if (!Order) {
                return res.status(404).json({
                    message: 'No such Order'
                });
            }

            Order.user = req.body.user ? req.body.user : Order.user;
			Order.address = req.body.address ? req.body.address : Order.address;
			Order.products = req.body.products ? req.body.products : Order.products;
			Order.shipping = req.body.shipping ? req.body.shipping : Order.shipping;
			Order.subTotal = req.body.subTotal ? req.body.subTotal : Order.subTotal;
			Order.status = req.body.status ? req.body.status : Order.status;
			Order.discount = req.body.discount ? req.body.discount : Order.discount;
			
            Order.save((err, Order) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Order.',
                        error: err
                    });
                }

                return res.json(Order);
            });
        });
    },

    /**
     * OrderController.remove()
     */
    remove: function (req, res) {
        const id = req.params.id;

        OrderModel.findByIdAndRemove(id, (err, Order) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Order.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};

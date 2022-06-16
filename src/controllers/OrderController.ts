import OrderModel from '../models/OrderModel';
import ProductModel from '../models/ProductModel';
import Razorpay from 'razorpay';

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

/**
 * OrderController.ts
 *
 * @description :: Server-side logic for managing Orders.
 */
export = {

    /**
     * OrderController.list()
     */
    list: async (req, res) => {
        try {
            const query = req.query
            const page = +query.page || 1
            const limit = +query.limit || 10
            const sliceStart = (page - 1) * limit
            const sliceEnd = sliceStart + limit
            const orders = await OrderModel.find({ user: req.user.id }).sort({ createdAt: 'desc' })
            res.send({
                count: orders.length,
                data: orders.slice(sliceStart, sliceEnd),
                page, limit
            })
        } catch (err) {
            res.status(400).send({ message: 'Error when getting Orders.', errors: [err] })
        }
    },

    /**
     * OrderController.show()
     */
    show: function (req, res) {
        const id = req.params.id;

        OrderModel.findOne({ _id: id, user: req.user.id }, (err, Order) => {
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

            return res.json({ data: Order });
        });
    },

    /**
     * OrderController.create()
     */
    create: async (req, res) => {
        try {
            const products = []
            for (const key in req.body.products) {
                let product = await ProductModel.findById(req.body.products[key].product)
                if (product) {
                    products.push({
                        product: product.id,
                        quantity: req.body.products[key].quantity,
                        price: req.body.products[key].price,
                    })
                }
            }
            const subTotal = products.reduce((a, b) => a + (b.price * b.quantity), 0)
            let order = new OrderModel({
                user: req.user.id,
                address: req.body.address,
                products,
                subTotal,
                shipping: subTotal < 500 ? 99 : 0,
            });

            order = await order.save()
            const data = await instance.orders.create({
                "amount": (order.subTotal + order.shipping) * 100,
                "currency": "INR",
                "receipt": order.id,
            })
            return res.status(201).json({ data })
        } catch (err) {
            return res.status(500).json({
                message: 'Error when creating Order',
                error: err.message || JSON.stringify(err)
            });
        }
    },

    /**
     * OrderController.create()
     */
    payment: async (req, res) => {
        try {
            const paymentId = req.body.razorpay_payment_id
            const order = await OrderModel.findById(req.body.receipt)
            const payment = await instance.payments.capture(paymentId, order.subTotal * 100)
            if (payment.captured) {
                order.payment = payment.id
                order.status = 'Created'
                await order.save()
            }
            const data = {
                orderId: order.id,
                paymentId
            }
            return res.status(201).json({ data })
        } catch (err) {
            return res.status(500).json({
                message: 'Error when Order Payment',
                error: err.message || JSON.stringify(err)
            });
        }
    },

    /**
     * OrderController.update()
     */
    update: function (req, res) {
        const id = req.params.id;

        OrderModel.findOne({ _id: id }, (err, Order) => {
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

import ProductModel from '../models/ProductModel';
import OrderModel from '../models/OrderModel';
import UserModel from '../models/UserModel';
import ContactModel from '../models/ContactModel';

export = {

    data: async (req, res) => {
        try {
            const data = {
                products: await ProductModel.countDocuments(),
                orders: await OrderModel.countDocuments(),
                users: await UserModel.countDocuments(),
                contacts: await ContactModel.countDocuments(),
            }
            res.send({ data })
        } catch (err) {
            res.status(400).send({ message: 'Error when getting Product.', errors: [err] })
        }
    },
};

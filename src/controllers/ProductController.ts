import ProductModel from '../models/ProductModel';

/**
 * ProductController.ts
 *
 * @description :: Server-side logic for managing Products.
 */
export = {

    /**
     * ProductController.list()
     */
    list: function (req, res) {
        ProductModel.find((err, Products) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Product.',
                    error: err
                });
            }

            return res.json(Products);
        });
    },

    /**
     * ProductController.show()
     */
    show: function (req, res) {
        const id = req.params.id;

        ProductModel.findOne({_id: id}, (err, Product) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Product.',
                    error: err
                });
            }

            if (!Product) {
                return res.status(404).json({
                    message: 'No such Product'
                });
            }

            return res.json(Product);
        });
    },

    /**
     * ProductController.create()
     */
    create: function (req, res) {
        const Product = new ProductModel({
			name : req.body.name,
			category : req.body.category,
			listPrice : req.body.listPrice,
			discountPrice : req.body.discountPrice,
			active : req.body.active,
			description : req.body.description,
			images : req.body.images
        });

        Product.save((err, Product) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Product',
                    error: err
                });
            }

            return res.status(201).json(Product);
        });
    },

    /**
     * ProductController.update()
     */
    update: function (req, res) {
        const id = req.params.id;

        ProductModel.findOne({_id: id}, (err, Product) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Product',
                    error: err
                });

            }
            if (!Product) {
                return res.status(404).json({
                    message: 'No such Product'
                });
            }

            Product.name = req.body.name ? req.body.name : Product.name;
			Product.category = req.body.category ? req.body.category : Product.category;
			Product.listPrice = req.body.listPrice ? req.body.listPrice : Product.listPrice;
			Product.discountPrice = req.body.discountPrice ? req.body.discountPrice : Product.discountPrice;
			Product.active = req.body.active ? req.body.active : Product.active;
			Product.description = req.body.description ? req.body.description : Product.description;
			Product.images = req.body.images ? req.body.images : Product.images;
			
            Product.save((err, Product) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Product.',
                        error: err
                    });
                }

                return res.json(Product);
            });
        });
    },

    /**
     * ProductController.remove()
     */
    remove: function (req, res) {
        const id = req.params.id;

        ProductModel.findByIdAndRemove(id, (err, Product) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Product.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};

import CategoryModel from '../models/CategoryModel';

/**
 * CategoryController.ts
 *
 * @description :: Server-side logic for managing Categorys.
 */
export = {

    /**
     * CategoryController.list()
     */
    list: function (req, res) {
        CategoryModel.find((err, Categorys) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Category.',
                    error: err
                });
            }

            return res.json(Categorys);
        });
    },

    /**
     * CategoryController.show()
     */
    show: function (req, res) {
        const id = req.params.id;

        CategoryModel.findOne({ _id: id }, (err, Category) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Category.',
                    error: err
                });
            }

            if (!Category) {
                return res.status(404).json({
                    message: 'No such Category'
                });
            }

            return res.json(Category);
        });
    },

    /**
     * CategoryController.create()
     */
    create: function (req, res) {
        const Category = new CategoryModel({
            name: req.body.name,
            image: req.body.image,
            active: req.body.active
        });

        Category.save((err, Category) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Category',
                    error: err
                });
            }

            return res.status(201).json(Category);
        });
    },

    /**
     * CategoryController.update()
     */
    update: function (req, res) {
        const id = req.params.id;

        CategoryModel.findOne({ _id: id }, (err, Category) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Category',
                    error: err
                });

            }
            if (!Category) {
                return res.status(404).json({
                    message: 'No such Category'
                });
            }

            Category.name = req.body.name ? req.body.name : Category.name;
            Category.image = req.body.image ? req.body.image : Category.image;
            Category.active = req.body.active ? req.body.active : Category.active;

            Category.save((err, Category) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Category.',
                        error: err
                    });
                }

                return res.json(Category);
            });
        });
    },

    /**
     * CategoryController.remove()
     */
    remove: function (req, res) {
        const id = req.params.id;

        CategoryModel.findByIdAndRemove(id, (err, Category) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Category.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};

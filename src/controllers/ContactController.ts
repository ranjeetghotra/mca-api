import ContactModel from '../models/ContactModel';
import MailService from '../services/MailService';

/**
 * ContactController.ts
 *
 * @description :: Server-side logic for managing Contacts.
 */
export = {

    /**
     * ContactController.list()
     */
    list: async (req, res) => {
        try {
            const query = req.query
            const page = +query.page || 1
            const limit = +query.limit || 10
            const sliceStart = (page - 1) * limit
            const sliceEnd = sliceStart + limit
            const contacts = await ContactModel.find().sort({ createdAt: 'desc' })
            res.send({
                count: contacts.length,
                data: contacts.slice(sliceStart, sliceEnd),
                page, limit
            })
        } catch (err) {
            res.status(400).send({ message: 'Error when getting Contacts.', errors: [err] })
        }
    },

    /**
     * ContactController.show()
     */
    show: function (req, res) {
        const id = req.params.id;

        ContactModel.findOne({_id: id}, (err, Contact) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Contact.',
                    error: err
                });
            }

            if (!Contact) {
                return res.status(404).json({
                    message: 'No such Contact'
                });
            }

            return res.json(Contact);
        });
    },

    /**
     * ContactController.create()
     */
    create: function (req, res) {
        const Contact = new ContactModel({
			user : req.user.id,
			name : req.body.name,
			email : req.body.email,
			subject : req.body.subject,
			message : req.body.message
        });

        MailService.sendMail({
            to: Contact.email,
            subject: 'Thanks for Contact',
            text: 'We will contact you back shortly, Thank you for your patience'
        })

        Contact.save((err, Contact) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Contact',
                    error: err
                });
            }

            return res.status(201).json(Contact);
        });
    },

    /**
     * ContactController.update()
     */
    update: function (req, res) {
        const id = req.params.id;

        ContactModel.findOne({_id: id}, (err, Contact) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Contact',
                    error: err
                });

            }
            if (!Contact) {
                return res.status(404).json({
                    message: 'No such Contact'
                });
            }

            Contact.user = req.body.user ? req.body.user : Contact.user;
			Contact.name = req.body.name ? req.body.name : Contact.name;
			Contact.email = req.body.email ? req.body.email : Contact.email;
			Contact.subject = req.body.subject ? req.body.subject : Contact.subject;
			Contact.message = req.body.message ? req.body.message : Contact.message;
			
            Contact.save((err, Contact) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Contact.',
                        error: err
                    });
                }

                return res.json(Contact);
            });
        });
    },

    /**
     * ContactController.remove()
     */
    remove: function (req, res) {
        const id = req.params.id;

        ContactModel.findByIdAndRemove(id, (err, Contact) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Contact.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};

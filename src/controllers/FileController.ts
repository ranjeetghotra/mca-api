import { v2 as Cloudinary } from 'cloudinary';

Cloudinary.config({
    cloud_name: 'marvelons',
    api_key: '581442682212914',
    api_secret: 'dT-3wkxn1R_7KSMnKFGCmwTN3T8',
    secure: true
});

export = {
    upload: async function (req, res) {
        try {
            const data = await Cloudinary.uploader.upload(req.body.file, {
                folder: 'mca'
            })
            res.send({ data })
        } catch (err) {
            res.status(400).send({ errors: [err] })
        }
    }
}

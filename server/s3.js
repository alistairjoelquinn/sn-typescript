const aws = require('aws-sdk');
const fs = require('fs');

let secrets;
if (process.env.NODE_ENV === 'production') {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require('./secrets.json'); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

exports.upload = (req, res, next) => {
    if (!req.file) {
        res.sendStatus(500);
        return;
    }
    const { filename, mimetype, size, path } = req.file;
    s3.putObject({
        Bucket: 'alsimageuniverse',
        ACL: 'public-read',
        Key: filename,
        Body: fs.createReadStream(path),
        ContentType: mimetype,
        ContentLength: size,
    })
        .promise()
        .then(() => {
            console.log('upload to bucket was successful');
            next();
        })
        .catch((err) => {
            console.log('upload to AWS bucket was unsuccessful', err);
            res.sendStatus(500);
        });
};

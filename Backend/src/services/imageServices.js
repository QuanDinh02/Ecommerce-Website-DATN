
require('dotenv').config()

const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    },
    region: bucketRegion
});

const getImage = async () => {
    try {

        // const data = [] < --array of products data

        // for (const product of data) {
        //     const getObjectParams = {
        //         Bucket: bucketName,
        //         Key: product.id
        //     }

        //     const command = new GetObjectCommand(getObjectParams);
        //     const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        // }

        const getObjectParams = {
            Bucket: bucketName,
            Key: "test_image.jpeg"
        }

        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

        return {
            EC: 0,
            DT: url,
            EM: 'Get image successfully !'
        }
    } catch (error) {
        console.log(error);
        return {
            EC: -2,
            DT: "",
            EM: 'Something is wrong on services !',
        }
    }
}

const uploadImage = async (file) => {
    try {

        const params = {
            Bucket: bucketName,
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype
        }

        const command = new PutObjectCommand(params);

        await s3.send(command);

        return {
            EC: 0,
            DT: "",
            EM: 'Add image successfully !'
        }
    } catch (error) {
        console.log(error);
        return {
            EC: -2,
            DT: "",
            EM: 'Something is wrong on services !',
        }
    }
}

const deleteImage = async () => {
    try {

        const getObjectParams = {
            Bucket: bucketName,
            Key: "test_image.jpeg"
        }

        const command = new DeleteObjectCommand(getObjectParams);

        await s3.send(command);
        
        return {
            EC: 0,
            DT: "",
            EM: 'Delete image successfully !'
        }
    } catch (error) {
        console.log(error);
        return {
            EC: -2,
            DT: "",
            EM: 'Something is wrong on services !',
        }
    }
}

module.exports = { getImage, uploadImage, deleteImage }
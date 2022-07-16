import { S3 } from "aws-sdk";
import { v4 } from "uuid";

const s3 = new S3();

const s3UploadV2 = async (file, folder) => {
    const param = {
        Bucket: process.env.AWS_BUCKET_NAME || "aws-s3-pet-pal",
        Key: `${folder}/${v4()}-${file.originalname}`,
        Body: file.buffer
    };
    return s3.upload(param).promise();
};

const s3DeleteV2 = async (key) => {
    const param = {
        Bucket: process.env.AWS_BUCKET_NAME || "aws-s3-pet-pal",
        Key: key
    };
    return s3.deleteObject(param).promise();
};

export const s3Service = {
    s3UploadV2,
    s3DeleteV2
};

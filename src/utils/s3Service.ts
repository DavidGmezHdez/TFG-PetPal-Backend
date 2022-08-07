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

const s3UploadMultipleFilesV2 = async (files, folder) => {
    const params = files.map((file) => {
        return {
            Bucket: process.env.AWS_BUCKET_NAME || "aws-s3-pet-pal",
            Key: `${folder}/${v4()}-${file.originalname}`,
            Body: file.buffer
        };
    });

    return await Promise.all(params.map((param) => s3.upload(param).promise()));
};

const s3DeleteV2 = async (key) => {
    const param = {
        Bucket: process.env.AWS_BUCKET_NAME || "aws-s3-pet-pal",
        Key: key
    };
    return s3.deleteObject(param).promise();
};

const s3DeleteMultipleFilesV2 = async (keys) => {
    const params = keys.map((key) => {
        return {
            Bucket: process.env.AWS_BUCKET_NAME || "aws-s3-pet-pal",
            Key: key
        };
    });
    return await Promise.all(
        params.map((param) => s3.deleteObject(param).promise())
    );
};

const s3UpdateV2 = async (key, file) => {
    const param = {
        Bucket: process.env.AWS_BUCKET_NAME || "aws-s3-pet-pal",
        Key: key,
        Body: file.buffer
    };
    return await s3.putObject(param).promise();
};
export const s3Service = {
    s3UploadV2,
    s3UploadMultipleFilesV2,
    s3DeleteV2,
    s3DeleteMultipleFilesV2,
    s3UpdateV2
};

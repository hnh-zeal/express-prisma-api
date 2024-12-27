import { Readable } from 'stream';

import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { v4 as uuid } from 'uuid';
import { config } from '@/config';

if (!config.AWS_REGION || !config.AWS_ACCESS_KEY_ID || !config.AWS_SECRET_ACCESS_KEY || !config.AWS_S3_BUCKET) {
  throw new Error('Missing AWS configuration in environment variables.');
}

const s3Client = new S3Client({
  region: config.AWS_REGION,
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY
  }
});

export interface UploadedFile {
  buffer: Buffer;
  mimetype: string;
  originalname: string;
}

export const preSigned = async () => {
  // folderName = folderName.trim().replace(/[^a-zA-Z0-9-_\/]/g, '');
  // fileName = fileName.trim().replace(/[^a-zA-Z0-9-_\/.]/g, '');
  // const formattedDate = (0, customDate_1.getFormattedDate)();
  //   const randomName = (0, randomString_1.randomString)(3);
  //   const fileConfig = fileSizeLimit_1.fileUploadConfig[fileType];
  //   if (!expiresTime) {
  //       expiresTime = fileConfig["maxTime"];
  //   }
  //   const fileSize = fileConfig["maxSize"];
  //   const sanitizedFolderName = `${config_1.STORAGE_FOLDER}/${folderName}`;
  //   const sanitizedFileName = `${sanitizedFolderName}/${formattedDate}/${randomName}-${fileName}`;
  //   const uploadFilePath = `${config_1.STORAGE_URL}/${sanitizedFileName}`;
  //   const params = {
  //       Bucket: config_1.AWS_BUCKET_NAME,
  //       Key: sanitizedFileName,
  //       Conditions: [
  //           ["starts-with", "$key", sanitizedFileName],
  //           ["content-length-range", 0, fileSize],
  //           ["starts-with", "$Content-Type", fileType],
  //       ],
  //       Fields: {
  //           "Content-Type": fileType,
  //           "x-amz-meta-fileId": userId,
  //           "x-amz-meta-projectName": config_1.STORAGE_FOLDER,
  //       },
  //       Expires: expiresTime,
  //   };
  //   try {
  //       const presignedPost = await (0, s3_presigned_post_1.createPresignedPost)(s3_1.s3Client, params);
  //       return {
  //           ...presignedPost,
  //           uploadFilePath,
  //           expiresTime,
  //           fileSize,
  //       };
  //   }
  //   catch (error) {
  //       console.error("Error generating presigned POST:", error);
  //       throw new Error("Failed to generate presigned POST URL");
  //   }
};

export const uploadFile = async (file: UploadedFile, path?: string): Promise<any> => {
  try {
    const bodyStream = Readable.from(file.buffer);
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: config.AWS_S3_BUCKET,
        ContentType: file.mimetype,
        Key: `${path ?? 'blog/profile'}/${uuid()}-${file.originalname}`,
        ACL: 'public-read',
        Body: bodyStream
      }
    });

    return upload.done();
  } catch (error) {
    console.error('Error uploading profile:', error);
    throw error;
  }
};

export const deleteFile = async (key: string): Promise<any> => {
  try {
    const deleteObjectCommand = new DeleteObjectCommand({
      Bucket: config.AWS_S3_BUCKET,
      Key: key
    });

    const deleteResponse = await s3Client.send(deleteObjectCommand);
    return deleteResponse;
  } catch (err) {
    console.error(`Error deleting file ${key}:`, err);
    throw err;
  }
};

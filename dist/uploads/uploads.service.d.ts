import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
export declare class UploadService {
    private readonly config;
    client: S3Client;
    constructor(config: ConfigService);
    create(file: {
        fileName: string;
        fileType: string;
        body: Buffer;
    }): Promise<{
        name: string;
    }>;
}

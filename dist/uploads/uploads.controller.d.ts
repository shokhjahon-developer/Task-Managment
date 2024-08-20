import { UploadService } from './uploads.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    create(file: Express.Multer.File): Promise<{
        name: string;
    }>;
}

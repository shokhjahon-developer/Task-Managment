"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const crypto_1 = require("crypto");
const path_1 = require("path");
let UploadService = class UploadService {
    constructor(config) {
        this.config = config;
        this.client = new client_s3_1.S3Client({
            endpoint: config.get('R2_ENDPOINT'),
            region: 'auto',
            credentials: {
                accessKeyId: config.get('R2_ACCESS_KEY'),
                secretAccessKey: config.get('R2_SECRET_KEY'),
            },
        });
    }
    async create(file) {
        const name = `${(0, crypto_1.randomUUID)()}${(0, path_1.extname)(file.fileName)}`;
        await this.client.send(new client_s3_1.PutObjectCommand({
            Bucket: this.config.get('R2_BUCKET'),
            Key: name,
            ContentType: file.fileType,
            Body: file.body,
        }));
        return { name };
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], UploadService);
//# sourceMappingURL=uploads.service.js.map
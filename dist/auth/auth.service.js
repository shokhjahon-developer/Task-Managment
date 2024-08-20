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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt_1 = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(prisma, jwt, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
    }
    async register({ email, name, password }) {
        const user = await this.prisma.user.findUnique({ where: { email: email } });
        if (user) {
            throw new common_1.BadRequestException('Email already exists');
        }
        const hashedPass = await (0, bcrypt_1.hash)(password, 12);
        const newUser = await this.prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPass,
            },
        });
        const token = await this.jwt.sign({ id: newUser.id }, {
            secret: this.config.get('JWT_SECRET_KEY'),
            expiresIn: this.config.get('JWT_EXPIRATION'),
        });
        return { data: token };
    }
    async login({ email, password }) {
        const user = await this.prisma.user.findUnique({ where: { email: email } });
        if (!user) {
            throw new common_1.BadRequestException('Invalid email or password');
        }
        const isMatch = await (0, bcrypt_1.compare)(password, user.password);
        if (!isMatch) {
            throw new common_1.BadRequestException('Invalid email or password');
        }
        const token = await this.jwt.sign({ id: user.id }, {
            secret: this.config.get('JWT_SECRET_KEY'),
            expiresIn: this.config.get('JWT_EXPIRATION'),
        });
        return { data: token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
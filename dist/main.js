"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_1 = require("./app");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const basicAuth = require("express-basic-auth");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_1.AppModule, { cors: true });
    const configServise = app.get(config_1.ConfigService);
    const port = +configServise.get('PORT');
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    app.use('api/docs', basicAuth({
        challenge: true,
        users: {
            admin: configServise.get('DOCS_PASS'),
        },
    }));
    app.enableVersioning();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Todo List')
        .setDescription('description of the list of tasks')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    await app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        console.log(`Documentation is available at http://localhost:${port}/api/docs`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map
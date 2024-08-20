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
exports.CreateTodoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class CreateTodoDto {
}
exports.CreateTodoDto = CreateTodoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Complete homework',
        description: 'The title of the todo task',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTodoDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'b4087156-d8df-45a7-822f-9d173e3fdc98',
        description: 'The id of the category this todo task belongs to',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTodoDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Finish the math assignment by Friday',
        description: 'A brief description of the todo task',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTodoDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-08-30',
        description: 'The deadline for completing the  task',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateTodoDto.prototype, "deadline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'high',
        description: 'The importance level of the task.',
    }),
    (0, class_validator_1.IsEnum)(client_1.Priority),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTodoDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'toDo',
        description: 'Whether the todo task has been completed',
    }),
    (0, class_validator_1.IsEnum)(client_1.Status),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTodoDto.prototype, "status", void 0);
//# sourceMappingURL=create-todo.dto.js.map
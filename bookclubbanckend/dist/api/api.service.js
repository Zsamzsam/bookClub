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
exports.ApiService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ApiService = class ApiService {
    constructor(db) {
        this.db = db;
    }
    create(createApiDto) {
        return this.db.members.create({
            data: {
                ...createApiDto,
                gender: createApiDto.gender ? createApiDto.gender : null,
                created_at: new Date(Date.now())
            },
            select: {
                id: true,
                name: true,
                gender: true,
                birth_date: true,
                created_at: true,
                banned: false,
                payment: false,
                updated_at: false
            }
        });
    }
    findAll() {
        return this.db.members.findMany({
            select: {
                id: true,
                name: true,
                gender: true,
                birth_date: true,
                created_at: true,
                banned: false,
                payment: false,
                updated_at: false
            }
        });
    }
    async pay(id) {
        const members = await this.db.members.findUnique({
            where: {
                id: id
            }
        });
        if (members == null) {
            throw new common_1.NotFoundException();
        }
        const this_month = new Date().getMonth();
        const payment = await this.db.payment.findMany({
            where: {
                member_id: id
            }
        });
        payment.forEach(p => {
            if (p.paid_at.getMonth() == this_month) {
                throw new common_1.ConflictException();
            }
        });
        return this.db.payment.create({
            data: {
                amount: 5000,
                paid_at: new Date(Date.now()),
                members: {
                    connect: {
                        id: id
                    }
                }
            }
        });
    }
};
exports.ApiService = ApiService;
exports.ApiService = ApiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ApiService);
//# sourceMappingURL=api.service.js.map
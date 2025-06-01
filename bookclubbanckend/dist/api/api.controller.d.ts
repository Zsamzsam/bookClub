import { ApiService } from './api.service';
import { CreateApiDto } from './dto/create-api.dto';
export declare class ApiController {
    private readonly apiService;
    constructor(apiService: ApiService);
    create(createApiDto: CreateApiDto): import(".prisma/client").Prisma.Prisma__membersClient<{
        id: number;
        name: string;
        gender: import(".prisma/client").$Enums.members_gender;
        birth_date: Date;
        created_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    createPay(id: string): Promise<{
        id: number;
        member_id: number;
        amount: number;
        paid_at: Date;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
        gender: import(".prisma/client").$Enums.members_gender;
        birth_date: Date;
        created_at: Date;
    }[]>;
}

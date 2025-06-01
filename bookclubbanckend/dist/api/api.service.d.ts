import { CreateApiDto } from './dto/create-api.dto';
import { PrismaService } from 'src/prisma.service';
export declare class ApiService {
    private readonly db;
    constructor(db: PrismaService);
    create(createApiDto: CreateApiDto): import(".prisma/client").Prisma.Prisma__membersClient<{
        id: number;
        name: string;
        gender: import(".prisma/client").$Enums.members_gender;
        birth_date: Date;
        created_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
        gender: import(".prisma/client").$Enums.members_gender;
        birth_date: Date;
        created_at: Date;
    }[]>;
    pay(id: number): Promise<{
        id: number;
        member_id: number;
        amount: number;
        paid_at: Date;
    }>;
}

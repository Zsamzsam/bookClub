import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateApiDto } from './dto/create-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';
import { PrismaService } from 'src/prisma.service';
import { members, members_gender, payment } from '@prisma/client';

@Injectable()
export class ApiService {

  constructor(private readonly db: PrismaService){

  }

  create(createApiDto: CreateApiDto) {
    return this.db.members.create({
      data:{
        ...createApiDto,
        gender: createApiDto.gender ? createApiDto.gender as members_gender : null, 
        created_at: new Date(Date.now())
      },
      select:{
        id:true,
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
      select:{
        id:true,
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


  async pay(id: number){
    const members: members = await this.db.members.findUnique({
      where: {
        id: id
      }
    })

    if(members == null){
      throw new NotFoundException()
    }

    const this_month = new Date().getMonth();
    const payment: payment[] = await this.db.payment.findMany({
      where:{
        member_id: id
      }
    })
    payment.forEach(p =>{
      if(p.paid_at.getMonth() == this_month){
        throw new ConflictException()
      }
    })

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
    })
  }
}

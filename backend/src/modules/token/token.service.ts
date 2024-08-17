import { Injectable } from '@nestjs/common';
import { PrismaService } from 'modules/prisma/prisma.service';

@Injectable()
export class TokenService {
  constructor(private readonly prismaService: PrismaService) {}
}

import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'guards/jwtGuard';

@ApiTags('API')
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {}

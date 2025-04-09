// volunteer.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Volunteer } from './entities/volunteer.entity';
import { Event } from '../event/entities/event.entity';
import { VolunteerService } from './volunteer.service';
import { VolunteerController } from './volunteer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Volunteer, Event])],
  controllers: [VolunteerController],
  providers: [VolunteerService],
})
export class VolunteerModule {}

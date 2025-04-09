// src/event/event.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Volunteer } from '../volunteer/entities/volunteer.entity';
import { EventService } from './event.service';
import { EventController } from './event.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Volunteer])], // ✅ Add Event here
  controllers: [EventController],
  providers: [EventService],
  exports: [TypeOrmModule], // ✅ Export if used in other modules
})
export class EventModule {}

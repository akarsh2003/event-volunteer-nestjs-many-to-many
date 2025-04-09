import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VolunteerModule } from './volunteer/volunteer.module';
import { EventModule } from './event/event.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Volunteer } from './volunteer/entities/volunteer.entity';
import { Event } from './event/entities/event.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'pass@word1',
      database: 'volunteer',
      entities: [Volunteer, Event],
      synchronize: true, // true only for development
    }),VolunteerModule,
    EventModule,
  ],
})
export class AppModule {}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  //create an event
  create(createEventDto: CreateEventDto) {
    const event = this.eventRepository.create(createEventDto);
    return this.eventRepository.save(event);
  }

  //find every events
  findAll() {
    return this.eventRepository.find();
  }

  //find an event with it's id
  findOne(id: number) {
    return this.eventRepository.findOne({ where: { id } });
  }

  // update(id: number, updateEventDto: UpdateEventDto) {
  //   return this.eventRepository.update(id, updateEventDto);
  // }

  // remove(id: number) {
  //   return this.eventRepository.delete(id);
  // }


  //find volunteers registered for an event with its id
  async getVolunteersForEvent(eventId: number) {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ['volunteers'],
    });
  
    if (!event) {
      throw new NotFoundException('Event not found');
    }
  
    return event.volunteers;
  }

  //delete an event with its id 
  async deleteEvent(id: number) {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return this.eventRepository.remove(event);
  }
  
}

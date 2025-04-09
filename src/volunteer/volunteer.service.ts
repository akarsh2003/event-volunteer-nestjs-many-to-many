import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';
import { Volunteer } from './entities/volunteer.entity';
import { Event } from '../event/entities/event.entity';

@Injectable()
export class VolunteerService {
  constructor(
    @InjectRepository(Volunteer)
    private readonly volunteerRepository: Repository<Volunteer>,

    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async create(createVolunteerDto: CreateVolunteerDto): Promise<Volunteer> {
    const volunteer = this.volunteerRepository.create(createVolunteerDto);
    return await this.volunteerRepository.save(volunteer);
  }

  async findAll(): Promise<Volunteer[]> {
    return await this.volunteerRepository.find({ relations: ['events'] });
  }

  async findOne(id: number): Promise<Volunteer> {
    const volunteer = await this.volunteerRepository.findOne({
      where: { id },
      relations: ['events'],
    });
    if (!volunteer) {
      throw new NotFoundException(`Volunteer with ID ${id} not found`);
    }
    return volunteer;
  }

  async update(id: number, updateVolunteerDto: UpdateVolunteerDto): Promise<Volunteer> {
    const volunteer = await this.findOne(id);
    Object.assign(volunteer, updateVolunteerDto);
    return await this.volunteerRepository.save(volunteer);
  }

  async remove(id: number): Promise<void> {
    const volunteer = await this.findOne(id);
    await this.volunteerRepository.remove(volunteer);
  }

  async assignEvent(volunteerId: number, eventId: number): Promise<Volunteer> {
    const volunteer = await this.volunteerRepository.findOne({
      where: { id: volunteerId },
      relations: ['events'],
    });
    if (!volunteer) throw new NotFoundException('Volunteer not found');

    const event = await this.eventRepository.findOneBy({ id: eventId });
    if (!event) throw new NotFoundException('Event not found');

    const alreadyAssigned = volunteer.events.find(e => e.id === event.id);
    if (!alreadyAssigned) {
      volunteer.events.push(event);
      await this.volunteerRepository.save(volunteer);
    }

    return volunteer;
  }
}

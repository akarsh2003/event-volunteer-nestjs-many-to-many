import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
  } from 'typeorm';
  import { Volunteer } from '../../volunteer/entities/volunteer.entity';
  
  @Entity()
  export class Event {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;
  
    @Column()
    location: string;
  
    @Column()
    startDate: Date;
  
    @Column()
    endDate: Date;
  
    @ManyToMany(() => Volunteer, (volunteer) => volunteer.events)
    volunteers: Volunteer[];
  }
  
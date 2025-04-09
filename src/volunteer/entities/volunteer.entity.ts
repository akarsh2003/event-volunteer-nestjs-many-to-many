import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
  } from 'typeorm';
  import { Event } from '../../event/entities/event.entity';
  
  @Entity()
  export class Volunteer {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column({ unique: true })
    email: string;
  
    @ManyToMany(() => Event, (event) => event.volunteers, { cascade: true })
    @JoinTable()
    events: Event[];
  }
  
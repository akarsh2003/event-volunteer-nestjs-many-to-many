import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';

@Controller('volunteers') // ✅ This defines base route
export class VolunteerController {
  constructor(private readonly volunteerService: VolunteerService) {}

  @Post()
  create(@Body() dto: CreateVolunteerDto) {
    return this.volunteerService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.volunteerService.findOne(id);
  }

  @Post(':volunteerId/events/:eventId')
  assignEvent(
    @Param('volunteerId') volunteerId: number,
    @Param('eventId') eventId: number
  ) {
    return this.volunteerService.assignEvent(volunteerId, eventId);
  }
}

import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PupilsService } from './pupils.service';
import { CreatePupilDto } from './create-pupil-dto';

@Controller('api/pupils')
export class PupilsController {
  constructor(private pupilsService: PupilsService) {}

  //@UseGuards(JwtAuthGuard)
  @Post()
  addClass(@Body() pupil: CreatePupilDto) {
    return this.pupilsService.addPupil(pupil);
  }

  @Get(':id')
  getPupil(@Param('id') id: string) {
    return this.pupilsService.getPupil(id);
  }
}

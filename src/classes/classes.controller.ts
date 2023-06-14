import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { NewClassDto } from './classes.interface';

@Controller('api/classes')
export class ClassesController {
  constructor(private classesService: ClassesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getClasses() {
    return this.classesService.getClasses();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getClass(@Param('id') id: string) {
    return this.classesService.getClass(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  addClass(@Body() clas: NewClassDto) {
    return this.classesService.addClass(clas);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateClass(@Body() updatedClass: NewClassDto, @Param('id') id: string) {
    return this.classesService.updateClass(id, updatedClass);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  removeClass(@Param('id') id: string) {
    return this.classesService.removeClass(id);
  }
}

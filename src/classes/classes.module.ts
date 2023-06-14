import { Module } from '@nestjs/common';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Class, ClassSchema } from './schemas/class.schema';
import { Pupil, PupilSchema } from '../pupils/schemas/pupil.schema';

@Module({
  controllers: [ClassesController],
  imports: [
    MongooseModule.forFeature([
      { name: Class.name, schema: ClassSchema },
      { name: Pupil.name, schema: PupilSchema },
    ]),
  ],
  providers: [ClassesService],
})
export class ClassesModule {}

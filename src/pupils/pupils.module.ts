import { Module } from '@nestjs/common';
import { PupilsController } from './pupils.controller';
import { PupilsService } from './pupils.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pupil, PupilSchema } from './schemas/pupil.schema';

@Module({
  controllers: [PupilsController],
  imports: [
    MongooseModule.forFeature([{ name: Pupil.name, schema: PupilSchema }]),
  ],
  providers: [PupilsService],
})
export class PupilsModule {}

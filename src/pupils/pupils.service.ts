import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pupil, PupilDocument } from './schemas/pupil.schema';
import { CreatePupilDto } from './create-pupil-dto';

@Injectable()
export class PupilsService {
  constructor(
    @InjectModel(Pupil.name) private pupilModel: Model<PupilDocument>,
  ) {}

  async addPupil(pupil: CreatePupilDto) {
    try {
      const newPupil = new this.pupilModel({
        name: pupil.name,
        class: pupil.classId,
        isNew: true,
      });
      console.log(newPupil);

      return newPupil.save();
    } catch (err) {
      throw new HttpException('Something went wrong.', HttpStatus.BAD_REQUEST, {
        cause: err,
      });
    }
  }

  async getPupil(id: string) {
    try {
      return await this.pupilModel.findById(id);
    } catch (err) {
      throw new HttpException(
        'Pupil is not found. Please try again.',
        HttpStatus.NOT_FOUND,
        {
          cause: err,
        },
      );
    }
  }
}

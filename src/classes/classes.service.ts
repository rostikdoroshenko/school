import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Class, ClassDocument } from './schemas/class.schema';
import { Model } from 'mongoose';
import { ClassDto, NewClassDto } from './classes.interface';
import { Pupil, PupilDocument } from '../pupils/schemas/pupil.schema';
import { PupilDto } from '../pupils/pupil.interface';

@Injectable()
export class ClassesService {
  constructor(
    @InjectModel(Class.name) private classModel: Model<ClassDocument>,
    @InjectModel(Pupil.name) private pupilModel: Model<PupilDocument>,
  ) {}

  async getClasses(): Promise<ClassDocument[]> {
    try {
      return await this.classModel.find().sort({ date: -1 });
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Something went wrong. Please try again.',
        },
        HttpStatus.BAD_REQUEST,
        { cause: err },
      );
    }
  }

  async getClass(id: string): Promise<ClassDto | string> {
    try {
      const oneClass: ClassDto = await this.classModel.findOne({ _id: id });
      const pupils: PupilDto[] = await this.pupilModel.find({
        class: id,
      });
      if (oneClass) {
        return {
          _id: id,
          name: oneClass.name,
          date: oneClass.date,
          pupils,
        };
      } else {
        return 'No class with this id';
      }
    } catch (err) {
      throw new HttpException(
        'Something went wrong. Please try again.',
        HttpStatus.BAD_REQUEST,
        { cause: err },
      );
    }
  }

  async addClass(clas: NewClassDto): Promise<Class> {
    const newClass = await new this.classModel({
      name: clas.name,
      isNew: true,
    });
    try {
      return newClass.save();
    } catch (err) {
      throw new HttpException(
        'Something went wrong. Please try again.',
        HttpStatus.BAD_REQUEST,
        { cause: err },
      );
    }
  }

  async updateClass(
    id: string,
    updateClass: NewClassDto,
  ): Promise<{ message: string }> {
    const updatedClass = new this.classModel({
      _id: id,
      name: updateClass.name,
    });
    try {
      await this.classModel.updateOne({ _id: id }, updatedClass);
      return {
        message: 'Class has been updated',
      };
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Not found. Please try again.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async removeClass(id: string): Promise<{ message: string }> {
    try {
      await this.classModel.findByIdAndRemove({ _id: id });
      return {
        message: 'Class has been removed',
      };
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Not found. Please try again.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}

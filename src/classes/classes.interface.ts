import { PupilDto } from '../pupils/pupil.interface';

export interface NewClassDto {
  name: string;
}

export interface ClassDto {
  name: string;
  date: Date;
  _id: string;
  pupils?: PupilDto[];
}

export interface OneClass {
  name: string;
  date: Date;
  _id: string;
  pupils?: PupilDto[];
}

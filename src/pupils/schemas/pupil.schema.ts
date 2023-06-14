import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Class } from '../../classes/schemas/class.schema';
import * as mongoose from 'mongoose';

export type PupilDocument = HydratedDocument<Pupil>;

@Schema()
export class Pupil {
  @Prop({ required: true })
  name: string;
  @Prop({ default: Date.now })
  date: Date;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Class' })
  class: Class;
}

export const PupilSchema = SchemaFactory.createForClass(Pupil);

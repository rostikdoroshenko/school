import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClassDocument = HydratedDocument<Class>;

@Schema()
export class Class {
  @Prop({ required: true })
  name: string;
  @Prop({ default: Date.now })
  date: Date;
}

export const ClassSchema = SchemaFactory.createForClass(Class);

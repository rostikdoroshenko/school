import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ClassesModule } from './classes/classes.module';
import { PupilsModule } from './pupils/pupils.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:pass@school-cluster.byzmjlf.mongodb.net/?retryWrites=true&w=majority',
    ),
    AuthModule,
    ClassesModule,
    PupilsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

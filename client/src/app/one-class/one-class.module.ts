import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OneClassComponent } from './one-class.component';
import { OneClassRoutingModule } from './one-class-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PupilsModule } from '../pupils/pupils.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [OneClassComponent],
  imports: [
    CommonModule,
    OneClassRoutingModule,
    MatCardModule,
    MatProgressBarModule,
    PupilsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class OneClassModule {}

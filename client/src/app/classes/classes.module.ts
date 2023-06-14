import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesService } from './classes.service';
import { CreateClassComponent } from './create-class/create-class.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ClassesComponent } from './classes.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [CreateClassComponent, ClassesComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDialogModule,
    MatIconModule,
    RouterLink,
  ],
  providers: [ClassesService],
  exports: [CreateClassComponent, ClassesComponent],
})
export class ClassesModule {}

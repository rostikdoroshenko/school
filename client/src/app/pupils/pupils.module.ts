import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PupilsComponent } from './pupils.component';
import { PupilsService } from './pupils.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [PupilsComponent],
  imports: [CommonModule, MatTableModule, MatIconModule],
  providers: [PupilsService],
  exports: [PupilsComponent],
})
export class PupilsModule {}

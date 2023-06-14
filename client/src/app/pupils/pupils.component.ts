import { Component, Input } from '@angular/core';
import { PupilDto } from '../../../../src/pupils/pupil.interface';

export enum TableHeader {
  name = 'name',
  index = '#',
  date = 'date',
  activity = 'activity',
}

@Component({
  selector: 'app-pupils',
  templateUrl: './pupils.component.html',
  styleUrls: ['./pupils.component.scss'],
})
export class PupilsComponent {
  @Input() dataSource!: PupilDto[];

  displayedColumns: string[] = [
    TableHeader.index,
    TableHeader.name,
    TableHeader.date,
    TableHeader.activity,
  ];

  onEdit(el: any) {
    console.log(el);
  }
  onDelete(el: any) {
    console.log(el);
  }
}

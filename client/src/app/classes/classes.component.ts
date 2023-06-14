import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateClassComponent } from './create-class/create-class.component';
import { ClassDto } from '../../../../src/classes/classes.interface';
import { AppFacade } from '../store/facade';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class ClassesComponent implements OnInit {
  constructor(public dialog: MatDialog, public appFacade: AppFacade) {}

  ngOnInit() {
    this.appFacade.loadClasses();
  }

  addNewDialog(): void {
    this.dialog.open(CreateClassComponent, {
      disableClose: true,
      data: {
        title: 'New Class',
        isEdit: false,
      },
    });
  }

  editDialog(clas: ClassDto, event: Event): void {
    event.stopPropagation();
    this.dialog.open(CreateClassComponent, {
      data: {
        name: clas.name,
        title: 'Edit Class',
        isEdit: true,
        id: clas._id,
      },
      disableClose: true,
    });
  }

  deleteClass(id: string, event: Event): void {
    event.stopPropagation();
    this.appFacade.deleteClass(id);
  }
}

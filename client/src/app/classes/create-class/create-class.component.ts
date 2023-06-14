import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NewClassDto } from '../../../../../src/classes/classes.interface';
import { AppFacade } from '../../store/facade';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.scss'],
})
export class CreateClassComponent implements OnInit {
  formGroup!: FormGroup;
  title = '';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { name: string; id: string; title: string; isEdit: boolean },
    public dialog: MatDialog,
    private appFacade: AppFacade,
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl(this.data ? this.data.name : null, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
    this.title = this.data.title;
  }

  onSaveClass(): void {
    const newClass: NewClassDto = {
      name: this.formGroup.controls['name'].value,
    };
    this.appFacade.saveClass(newClass, this.data);
  }
}

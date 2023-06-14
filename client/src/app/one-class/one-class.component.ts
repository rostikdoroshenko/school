import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClassesService } from '../classes/classes.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { CreatePupilDto } from '../../../../src/pupils/create-pupil-dto';
import { PupilsService } from '../pupils/pupils.service';
import { AppFacade } from '../store/facade';

@Component({
  selector: 'app-one-class',
  templateUrl: './one-class.component.html',
  styleUrls: ['./one-class.component.scss'],
})
export class OneClassComponent implements OnInit, OnDestroy {
  classId!: string;
  formGroup!: FormGroup;
  constructor(
    private classesService: ClassesService,
    private route: ActivatedRoute,
    private pupilsService: PupilsService,
    public appFacade: AppFacade,
  ) {}

  ngOnInit(): void {
    this.appFacade.loadClasses();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.classId = paramMap.get('id') || '';
        this.getClass();
      }
    });
  }

  ngOnDestroy(): void {
    this.appFacade.resetClass();
  }

  getClass(): void {
    this.appFacade.loadClass(this.classId);
    this.appFacade.getClass$.subscribe((oneClass) => {
      if (oneClass) {
        this.initForm();
      }
    });
  }

  initForm(): void {
    this.formGroup = new FormGroup({
      name: new FormControl(null),
    });
  }

  onSavePupil(): void {
    console.log('click');
    const newPupil: CreatePupilDto = {
      name: this.formGroup.controls['name'].value,
      classId: this.classId,
    };
    console.log(newPupil);
    this.pupilsService.addPupil(newPupil).subscribe({
      next: () => this.getClass(),
    });
  }
}

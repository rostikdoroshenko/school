import { createAction, props } from '@ngrx/store';
import {
  ClassDto,
  NewClassDto,
  OneClass,
} from '../../../../src/classes/classes.interface';
import { HttpErrorResponse } from '@angular/common/http';

export const classesActions = {
  loadClasses: createAction('[CLASSES] load classes'),
  classesLoaded: createAction(
    '[CLASSES] classes was loaded successfully',
    props<{ classes: ClassDto[] }>(),
  ),
  classesLoadingError: createAction(
    '[CLASSES] classes loading error',
    props<{ error: HttpErrorResponse }>(),
  ),
  saveClass: createAction(
    '[CLASSES] save class',
    props<{ newClass: NewClassDto; data: any }>(),
  ),
  classSavedError: createAction(
    '[CLASSES] class saved error',
    props<{ error: HttpErrorResponse }>(),
  ),
  deleteClass: createAction('[CLASSES] delete class', props<{ id: string }>()),
};

export const oneClassActions = {
  loadClass: createAction('[CLASS] load class', props<{ id: string }>()),
  loadedClassSuccess: createAction(
    '[CLASS] loaded class success',
    props<{ oneClass: OneClass }>(),
  ),
  resetClass: createAction('[CLASS] reset class'),
};

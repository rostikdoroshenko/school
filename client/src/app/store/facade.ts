import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ClassDto,
  NewClassDto,
  OneClass,
} from '../../../../src/classes/classes.interface';
import { Store } from '@ngrx/store';
import {
  getClass,
  getClasses,
  isClassesLoading,
  isClassLoading,
} from './selectors';
import { classesActions, oneClassActions } from './actions';

@Injectable({
  providedIn: 'root',
})
export class AppFacade {
  getClasses$: Observable<ClassDto[]> = this.store.select(getClasses);
  isClassesLoading$: Observable<boolean> = this.store.select(isClassesLoading);
  isClassLoading$: Observable<boolean> = this.store.select(isClassLoading);
  getClass$: Observable<OneClass | undefined> = this.store.select(getClass);

  constructor(private store: Store) {}

  loadClasses() {
    this.store.dispatch(classesActions.loadClasses());
  }

  saveClass(newClass: NewClassDto, data: any) {
    this.store.dispatch(classesActions.saveClass({ newClass, data }));
  }

  deleteClass(id: string) {
    this.store.dispatch(classesActions.deleteClass({ id }));
  }

  loadClass(id: string) {
    this.store.dispatch(oneClassActions.loadClass({ id }));
  }

  resetClass() {
    this.store.dispatch(oneClassActions.resetClass());
  }
}

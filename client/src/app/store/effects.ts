import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClassesService } from '../classes/classes.service';
import { classesActions, oneClassActions } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class Effects {
  constructor(
    private actions$: Actions,
    private classesService: ClassesService,
  ) {}

  loadClasses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(classesActions.loadClasses),
      switchMap(() =>
        this.classesService.getClasses().pipe(
          map((classes) => classesActions.classesLoaded({ classes })),
          catchError((error) =>
            of(classesActions.classesLoadingError({ error })),
          ),
        ),
      ),
    ),
  );

  saveClass$ = createEffect(() =>
    this.actions$.pipe(
      ofType(classesActions.saveClass),
      switchMap(({ newClass, data }) => {
        if (data.isEdit) {
          return this.classesService.updateClass(data.id, newClass).pipe(
            map(() => classesActions.loadClasses()),
            catchError((error) =>
              of(classesActions.classSavedError({ error })),
            ),
          );
        } else {
          return this.classesService.addClass(newClass).pipe(
            map(() => classesActions.loadClasses()),
            catchError((error) =>
              of(classesActions.classSavedError({ error })),
            ),
          );
        }
      }),
    ),
  );

  deleteClass$ = createEffect(() =>
    this.actions$.pipe(
      ofType(classesActions.deleteClass),
      switchMap(({ id }) =>
        this.classesService
          .removeClass(id)
          .pipe(map(() => classesActions.loadClasses())),
      ),
    ),
  );

  loadClass$ = createEffect(() =>
    this.actions$.pipe(
      ofType(oneClassActions.loadClass),
      switchMap(({ id }) =>
        this.classesService
          .getClass(id)
          .pipe(
            map((oneClass) => oneClassActions.loadedClassSuccess({ oneClass })),
          ),
      ),
    ),
  );
}

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CLASS_KEY, CLASSES_KEY, ClassesState, ClassState } from './state';

export const classesFeatureSelector =
  createFeatureSelector<ClassesState>(CLASSES_KEY);
export const classFeatureSelector =
  createFeatureSelector<ClassState>(CLASS_KEY);

export const getClasses = createSelector(
  classesFeatureSelector,
  (state) => state.classes,
);

export const isClassesLoading = createSelector(
  classesFeatureSelector,
  (state) => state.isLoading,
);

export const getClass = createSelector(
  classFeatureSelector,
  (state) => state.oneClass,
);

export const isClassLoading = createSelector(
  classFeatureSelector,
  (state) => state.isLoading,
);

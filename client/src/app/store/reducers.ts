import {
  ActionReducer,
  ActionReducerMap,
  createReducer,
  MetaReducer,
  on,
} from '@ngrx/store';
import {
  CLASS_KEY,
  CLASSES_KEY,
  ClassesState,
  ClassState,
  State,
} from './state';
import { classesActions, oneClassActions } from './actions';
import { AUTH_KEY } from '../auth/store/auth-state';
import { authReducer } from '../auth/store/auth-reducer';

export const initialClassesState: ClassesState = {
  classes: [],
  isLoading: false,
  error: null,
};

export const initialClassState: ClassState = {
  oneClass: undefined,
  isLoading: false,
  error: null,
};

export const classesReducer = createReducer<ClassesState>(
  initialClassesState,
  on(classesActions.loadClasses, (state: ClassesState) => ({
    ...state,
    isLoading: true,
  })),
  on(classesActions.classesLoaded, (state: ClassesState, { classes }) => ({
    ...state,
    classes,
    isLoading: false,
  })),
  on(classesActions.classesLoadingError, (state: ClassesState, { error }) => ({
    ...state,
    error: error.message,
    isLoading: false,
  })),
  on(classesActions.saveClass, (state: ClassesState) => ({
    ...state,
    isLoading: true,
  })),
  on(classesActions.classSavedError, (state: ClassesState, { error }) => ({
    ...state,
    isLoading: false,
    error: error.message,
  })),
  on(classesActions.deleteClass, (state: ClassesState) => ({
    ...state,
    isLoading: true,
  })),
);

export const classReducer = createReducer<ClassState>(
  initialClassState,
  on(oneClassActions.loadClass, (state: ClassState) => ({
    ...state,
    isLoading: true,
  })),
  on(oneClassActions.loadedClassSuccess, (state: ClassState, { oneClass }) => ({
    ...state,
    oneClass,
    isLoading: false,
  })),
  on(oneClassActions.resetClass, (state) => ({
    ...state,
    oneClass: undefined,
  })),
);

export const reducers: ActionReducerMap<State> = {
  [CLASSES_KEY]: classesReducer,
  [CLASS_KEY]: classReducer,
  [AUTH_KEY]: authReducer,
};

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    //console.log('state', state);
    //console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer[] = [debug];

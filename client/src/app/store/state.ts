import { OneClass } from '../../../../src/classes/classes.interface';
import { AUTH_KEY, AuthState } from '../auth/store/auth-state';

export const CLASSES_KEY = 'classes';
export const CLASS_KEY = 'oneClass';

export interface ClassesState {
  classes: OneClass[];
  isLoading: boolean;
  error: string | null;
}

export interface ClassState {
  oneClass?: OneClass;
  isLoading: boolean;
  error: string | null;
}

export interface State {
  [CLASSES_KEY]: ClassesState;
  [CLASS_KEY]: ClassState;
  [AUTH_KEY]: AuthState;
}

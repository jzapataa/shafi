import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../models/user';
import { setUser, unSetUser } from './auth.actions';

export interface State {
  user: User;
}

export const initialState: State = {
  user: new User('', '', '', '', '', '', ''),
};

const _authReducer = createReducer(
  initialState,

  on(setUser, (state, { user }) => ({
    ...state,
    user: { ...user },
  })),
  on(unSetUser, (state) => ({
    ...state,
    user: new User('', '', '', '', '', '', ''),
  }))
);

export function authReducer(state: State | undefined, action: Action) {
  return _authReducer(state, action);
}

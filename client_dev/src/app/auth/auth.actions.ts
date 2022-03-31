import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';

export const setUser = createAction('[Auth] Set User', props<{ user: User }>());

export const unSetUser = createAction('[Auth] Unset User');

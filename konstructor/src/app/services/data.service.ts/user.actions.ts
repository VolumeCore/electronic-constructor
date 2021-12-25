import {createAction, props} from '@ngrx/store';
import {IUser} from "../../models/user.type";
import {IRegister} from "../../models/register.type";

export const loadDataEffect = createAction('Load Data Effect');
export const registerUserEffect = createAction('Register User Effect', props<{data: IRegister}>());
export const updateScoreEffect = createAction('Update Score Effect', props<{data: IUser}>());

export const loadData = createAction(
  'Load Data',
  props<{data: IUser[]}>()
)

export const registerUser = createAction('Register User')

export const updateScore = createAction('Update Score', props<{data: IUser}>())

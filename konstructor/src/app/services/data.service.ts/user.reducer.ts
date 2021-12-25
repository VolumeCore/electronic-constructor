import {Action, createReducer, on} from '@ngrx/store';
import {loadData, registerUser, updateScore} from "./user.actions";
import {IUser} from "../../models/user.type";

const initialState: IUser[] = [];

const _userReducer = createReducer(
  initialState,
  on(loadData, (state: IUser[], {data}) => {
    const newState: IUser[] = [];
    for (let item of data) {
      newState.push(item);
    }
    return newState;
  }),
  on(registerUser, (state: IUser[]) => {
    const newState: IUser[] = state.map(item => {
      return item;
    })
    return newState;
  }),
  on(updateScore, (state: IUser[], {data}) => {
    const newState: IUser[] = [];
    for (let item of state) {
      if (item._id !== data._id)
        newState.push(item);
    }
    console.log(data);
    newState.push(data);
    return newState;
  })
)

export function userReducer(state: IUser[] | undefined, action: Action): any {
  return _userReducer(state, action);
}

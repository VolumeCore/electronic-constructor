import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, catchError, switchMap} from 'rxjs/operators';
import {ApiService} from "./api.service";
import {EMPTY} from 'rxjs';
import {IUser} from "../../models/user.type";
import {IRegister} from "../../models/register.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../auth.service";

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions,
              private api: ApiService,
              private _snackBar: MatSnackBar,
              private auth: AuthService) {
  }
  loadData$ = createEffect(() => this.actions$.pipe(
    ofType('Load Data Effect'),
    switchMap(() => this.api.getUsers()),
    map((users: IUser[]) => {
      return {type: 'Load Data', data: users};
    }),
    catchError(() => {
      console.log('error');
      return EMPTY;
    })
  ));
  registerUser$ = createEffect(() => this.actions$.pipe(
    ofType('Register User Effect'),
    switchMap((data) => this.api.registerUser(data['data'])),
    map((user: IRegister) => {
      this._snackBar.open(`Добро пожаловать, ${user.username}!`, 'Закрыть', {duration: 3000});
      this.auth.login(user.username, user.password);
      return {type: 'Register User', data: user};
    }),
    catchError((err) => {
      console.error('error ' + err.status);
      this._snackBar.open('Имя пользователя занято', 'Закрыть', {duration: 3000});
      return EMPTY;
    })
  ));
  updateScore$ = createEffect(() => this.actions$.pipe(
    ofType('Update Score Effect'),
    switchMap((data) => this.api.updateScore(data['data'])),
    map((user: IUser) => {
      console.log(user)
      return {type: 'Update Score', data: user};
    }),
    catchError(() => {
      console.error('error');
      return EMPTY;
    })
  ));
}

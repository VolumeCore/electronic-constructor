import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

let delete_cookie = function(name: string) {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private _snackBar: MatSnackBar) {
  }

  login(username: string, password: string) {
    this.http.post('api/authenticate', {username: username, password: password})
      .subscribe((res: any) => {
        if (res.status !== 500) {
          this.router.navigate(['/']);
          localStorage.setItem('token', res.token);
          document.cookie = `_id=${res.signed_user._id}; auth=true; expires=Fri, 31 Dec 9999 23:59:59 GMT`
        }},
        (err: any) => {
          if (err.status === 401) {
            this._snackBar.open(`Неверное имя пользователя/пароль`, 'Закрыть', {duration: 3000});
          }
        }

      );
  }

  logout() {
    localStorage.removeItem('token');
    delete_cookie('_id');
  }

  public get logIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }
}

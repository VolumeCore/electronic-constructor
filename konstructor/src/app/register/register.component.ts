import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Store} from "@ngrx/store";
import {IUser} from "../models/user.type";
import {registerUserEffect} from "../services/data.service.ts/user.actions";
import {IRegister} from "../models/register.type";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public username: string = '';
  public password: string = '';
  public passwordType: string = 'password';

  constructor(private auth: AuthService, private store: Store<{ users: IUser[] }>) {
  }

  ngOnInit(): void {
  }

  register(): void {
    let newUser: IRegister = {username: this.username, password: this.password, score: 0}
    this.store.dispatch(registerUserEffect({data: newUser}));
  }

  showPassword(): void {
    if (this.passwordType === "password") {
      this.passwordType = "text";
    } else {
      this.passwordType = "password";
    }
  }

}

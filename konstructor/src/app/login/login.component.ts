import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string = '';
  public password: string = '';
  public passwordType: string = 'password';

  constructor(private auth: AuthService, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  login() {
    console.log('Login btn');
    this.auth.login(this.username, this.password);
  }

  showPassword(): void {
    if (this.passwordType === "password") {
      this.passwordType = "text";
    } else {
      this.passwordType = "password";
    }
  }

}

import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'konstructor';

  constructor(private auth: AuthService, private snackBar: MatSnackBar) {
  }

  public get authStatus(): boolean {
    return this.auth.logIn;
  }

  logout() {
    console.log('Logout btn');
    this.auth.logout();
  }
}

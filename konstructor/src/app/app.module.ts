import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import {RouterModule, Routes} from "@angular/router";
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {DragDropModule} from "@angular/cdk/drag-drop";

import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {userReducer} from "./services/data.service.ts/user.reducer";
import {UserEffects} from "./services/data.service.ts/user.effects";

import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from "@angular/material/divider";
import {RegisterComponent} from "./register/register.component";
import {MatCheckboxModule} from "@angular/material/checkbox";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NotFoundComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    DragDropModule,
    MatGridListModule,
    StoreModule,
    EffectsModule,
    StoreModule.forRoot({users: userReducer}, {}),
    EffectsModule.forRoot([UserEffects]),
    MatDividerModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

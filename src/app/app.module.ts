import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http"
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field"
import {MatInputModule} from '@angular/material/input'
import {MatCardModule} from "@angular/material/card"
import {MatButtonModule} from "@angular/material/button"
import {MatToolbarModule} from "@angular/material/toolbar"
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatExpansionModule} from "@angular/material/expansion"
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostCreateComponent} from "./posts/post-create/post-create.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { LoginComponent } from './auth/login/login/login.component';
import { SignupComponent } from './auth/signup/signup/signup.component'

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatExpansionModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RoutingModule} from './routing.module';
import {MaterialModule} from '@angular/material';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';

import {DishService} from './services/dish.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    MaterialModule
  ],
  providers: [DishService],
  bootstrap: [AppComponent],
})
export class AppModule { }

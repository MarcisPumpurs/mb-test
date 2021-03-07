import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopComponent } from './top/top.component';
import { BottomComponent } from './bottom/bottom.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { MainComponent } from './main/main.component';
import { SideComponent } from './side/side.component';
import { ValidationService } from './services/validation.service';
import { DataComponent } from './data/data.component';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    TopComponent,
    BottomComponent,
    SubscribeComponent,
    MainComponent,
    SideComponent,
    DataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ValidationService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

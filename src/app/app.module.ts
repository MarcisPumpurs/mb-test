import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopComponent } from './top/top.component';
import { BottomComponent } from './bottom/bottom.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { MainComponent } from './main/main.component';
import { SideComponent } from './side/side.component';

@NgModule({
  declarations: [
    AppComponent,
    TopComponent,
    BottomComponent,
    SubscribeComponent,
    MainComponent,
    SideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

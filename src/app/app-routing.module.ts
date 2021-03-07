import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BottomComponent } from './bottom/bottom.component';
import { DataComponent } from './data/data.component';
import { MainComponent } from './main/main.component';
import { DataService } from './services/data.service';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { TopComponent } from './top/top.component';

const routes: Routes = [
  {
    path: '',
    component: SubscribeComponent
  },
  {
    path: 'data',
    component: DataComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
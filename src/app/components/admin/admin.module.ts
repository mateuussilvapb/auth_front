import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Pages
import { HomeComponent } from './pages/home/home.component';

//Routing
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, AdminRoutingModule],
  exports: [HomeComponent],
})
export class AdminModule {}

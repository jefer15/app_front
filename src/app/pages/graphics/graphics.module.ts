import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphicsRoutingModule } from './graphics-routing.module';
import { GraphicsComponent } from './graphics.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    GraphicsComponent
  ],
  imports: [
    CommonModule,
    GraphicsRoutingModule,
    NgxChartsModule
  ]
})
export class GraphicsModule { }

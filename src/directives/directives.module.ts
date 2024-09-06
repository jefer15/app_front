import { NgModule } from '@angular/core';
import { NumbersOnlyDirective } from './numbers-only/numbers-only.directive';


@NgModule({
  declarations: [NumbersOnlyDirective],
  exports: [NumbersOnlyDirective]
})
export class DirectivesModule { }

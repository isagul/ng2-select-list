import { NgModule } from '@angular/core';
import { Ng2SelectListComponent } from './ng2-select-list.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [Ng2SelectListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [Ng2SelectListComponent]
})
export class Ng2SelectListModule { }

import { NgModule } from '@angular/core';
import { Ng2SelectListComponent } from './ng2-select-list.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule, MatIconModule, MatInputModule} from '@angular/material';

@NgModule({
  declarations: [Ng2SelectListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule
  ],
  exports: [Ng2SelectListComponent]
})
export class Ng2SelectListModule { }

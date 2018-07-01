import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { Main } from './main/main.component';

import {
  MatToolbarModule, MatIconModule, MatButtonModule,
  MatSidenavModule, MatListModule
} from '@angular/material';

const materials = [MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule, MatListModule];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '', component: Main, children: [
          { path: 'categories', loadChildren: './category/category.module#CategoryModule' }
        ]
      }
    ]),
    SharedModule,
    ...materials
  ],
  declarations: [Main],
  providers: []
})
export class AdminModule { }
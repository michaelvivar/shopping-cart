import { NgModule } from "@angular/core";
import { MatListModule, MatDividerModule, MatIconModule } from "@angular/material";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NavListComponent } from "./nav-list.component";

@NgModule({
   imports: [CommonModule, RouterModule, MatListModule, MatDividerModule, MatIconModule],
   exports: [NavListComponent],
   declarations: [NavListComponent]
})
export class NavListModule {

}
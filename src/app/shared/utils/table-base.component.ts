import { ViewChild } from "@angular/core";
import { BaseComponent } from "./base.component";
import { MatTableDataSource, MatPaginator } from "@angular/material";

export abstract class Table extends BaseComponent {

   protected dataSource: MatTableDataSource<any>;
   abstract columns: string[];
   @ViewChild(MatPaginator) paginator: MatPaginator;


   set data(value: any[]) {
      this.dataSource = new MatTableDataSource(value);
      if (this.paginator) {
         this.dataSource.paginator = this.paginator;
      }
   }

   get data() {
      return <any>this.dataSource;
   }

}
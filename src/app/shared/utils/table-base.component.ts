import { ViewChild } from "@angular/core";
import { BaseComponent } from "./base.component";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";

export abstract class Table extends BaseComponent {

   constructor(asPage = false) {
      super(asPage);
   }

   protected dataSource: MatTableDataSource<any>;
   abstract columns: string[];
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;


   set data(value: any[]) {
      this.dataSource = new MatTableDataSource(value);
      if (this.paginator) {
         this.dataSource.paginator = this.paginator;
      }
      if (this.sort) {
         this.dataSource.sort = this.sort;
      }
   }

   get data() {
      return <any>this.dataSource;
   }

}
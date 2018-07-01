import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './main.template.html',
  styles: [`
    .sidenav-container {
        height: 100%;
      }
      
    .sidenav {
        width: 200px;
        box-shadow: 3px 0 6px rgba(0,0,0,.24);
    }
  `]
})
export class Main {
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      ).pipe(tap(value => this.handset = value));

    name: string;
    handset: boolean;
      
    constructor(private breakpointObserver: BreakpointObserver) {}

    ngOnInit(): void {
      this.name = 'Admin';
    }

    @ViewChild('drawer') sidenav: MatSidenav;

    close() {
      if (this.handset) {
        this.sidenav.close();
      }
    }
}
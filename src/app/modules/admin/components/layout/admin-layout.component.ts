import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Location } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './admin-layout.template.html',
    styles: [`
    .sidenav-container {
        height: 100%;
    }
    .sidenav {
        width: 230px;
        box-shadow: 1px 0 2px rgba(0,0,0,.24);
    }
    .logo {
       width: 30px;
       margin: 0 10px;
    }
    .admin-layout {
        display: relative;
    }
    .admin-layout >* {
        display: block
    }
  `],
    animations: [
        trigger('pageAnimation', [
            transition('1 => 2', [
                style({ height: '!' }),
                query(':enter', style({ transform: 'translateX(100%)' })),
                query(':enter, :leave', style({ position: 'absolute', left: 0, right: 0 })),
                group([
                    query(':leave', [animate('0.3s cubic-bezier(.35, 0, .25, 1)', style({ transform: 'translateX(-100%)' }))]),
                    query(':enter', [animate('0.3s cubic-bezier(.35, 0, .25, 1)', style({ transform: 'translateX(0)' }))])
                ])
            ]),
            transition('2 => 1', [
                style({ height: '!' }),
                query(':enter', style({ transform: 'translateX(-100%)' })),
                query(':enter, :leave', style({ position: 'absolute', left: 0, right: 0 })),
                group([
                    query(':leave', [animate('0.3s cubic-bezier(.35, 0, .25, 1)', style({ transform: 'translateX(100%)' }))]),
                    query(':enter', [animate('0.3s cubic-bezier(.35, 0, .25, 1)', style({ transform: 'translateX(0)' }))])
                ])
            ])
        ])
    ]
})
export class AdminLayout {
    constructor(
        private location: Location,
        @Inject('TITLE') public title: string,
        @Inject('SIDENAVS') public navs: any[],
        @Inject('THEME') public theme: string
    ) {
    }

    @Select(store => store.page) page$: Observable<any>;

    @ViewChild('drawer') sidenav: MatSidenav;

    back() {
        this.location.back();
    }
}
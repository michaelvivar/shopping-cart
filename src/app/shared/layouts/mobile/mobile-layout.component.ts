import { Component, Inject } from "@angular/core";
import { style, query, group, animate, keyframes, trigger, transition } from '@angular/animations';


const next = [
   style({ height: '!' }),
   query(':enter', style({ transform: 'translateX(100%)' })),
   query(':enter, :leave', style({ position: 'absolute', left: 0, right: 0 })),
   group([
      query(':leave', [
         animate(
            '0.5s cubic-bezier(.35, 0, .25, 1)',
            style({ transform: 'translateX(-100%)' })
         ),
      ], { optional: true }),
      query(':enter', [
         animate(
            '0.5s cubic-bezier(.35, 0, .25, 1)',
            style({ transform: 'translateX(0)' })
         )
      ])
   ])
];

const back = [
   style({ height: '!' }),
   query(':enter', style({ transform: 'translateX(-100%)' })),
   query(':enter, :leave', style({ position: 'absolute', left: 0, right: 0 })),
   group([
      query(':leave', [animate('0.5s cubic-bezier(.35, 0, .25, 1)', style({ transform: 'translateX(100%)' }))]),
      query(':enter', [animate('0.5s cubic-bezier(.35, 0, .25, 1)', style({ transform: 'translateX(0)' }))])
   ])
]

@Component({
   templateUrl: './mobile-layout.template.html',
   styleUrls: ['mobile-layout.style.css'],
   animations: [
      trigger('pageAnimation', [
         transition('3 => 4', next),
         transition('2 => 3', next),
         transition('4 => *', back),
         transition('3 => *', back),
         transition('2 => *', back),
         transition('* => *', next)
      ])
   ]
})
export class MobileLayout {
   constructor(@Inject('THEME') public theme: string) { }
}
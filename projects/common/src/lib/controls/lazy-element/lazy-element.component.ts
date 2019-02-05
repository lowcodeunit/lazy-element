import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'lib-lazy-element',
  templateUrl: './lazy-element.component.html',
  styleUrls: ['./lazy-element.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class LazyElementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

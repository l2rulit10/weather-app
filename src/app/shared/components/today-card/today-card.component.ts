import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'wt-today-card',
  templateUrl: './today-card.component.html',
  styleUrls: ['./today-card.component.scss']
})
export class TodayCardComponent implements OnInit {
  @Input() weather: any;
  constructor() { }

  ngOnInit() {
  }

}

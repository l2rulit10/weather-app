import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'wt-day-card',
  templateUrl: './day-card.component.html',
  styleUrls: ['./day-card.component.scss']
})
export class DayCardComponent {
  @Input() weather: any;
  getWeekDay(date) {
    const days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    return days[date.getDay()];
  }
}

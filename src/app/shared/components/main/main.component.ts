import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'wt-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  @Input() todayWeather: any;
}

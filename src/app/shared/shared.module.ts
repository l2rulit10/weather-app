import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { TodayCardComponent } from './components/today-card/today-card.component';
import { DayCardComponent } from './components/day-card/day-card.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    MainComponent,
    TodayCardComponent,
    DayCardComponent,
    SearchComponent,
    LoaderComponent
  ],
  exports: [
    MainComponent,
    TodayCardComponent,
    DayCardComponent,
    SearchComponent,
    LoaderComponent
  ]
})
export class SharedModule { }

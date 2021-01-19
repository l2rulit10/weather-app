// import { any } from './shared/services/interface';
import { ImagesService } from './shared/services/images.service';
import { SearchService } from './shared/services/search.service';
import { WeatherService } from './shared/services/weather.service';

import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input, PLATFORM_ID, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';

const OPTIONS_DEFAULT: any = {
  slides: [],
  active: 0,
  hide: null,
  interval: 6000,
  indicators: true
};

@Component({
  selector: 'wt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  weather: any;
  todayWeather: any;
  images: any;
  hourlyWeather: any;
  options: any | null = null;
  watch$!: Observable<number>;
  changeSlide$ = new Subject<number>();
  data: any = {
    slides: []
  };
  constructor(
    private imagesService: ImagesService,
    private searchService: SearchService,
    @Inject(PLATFORM_ID) private platformId: Object) {}


  ngOnInit() {
    this.getAllReq();
  }
  config(options: Partial<any>) {
    this.options = { ...OPTIONS_DEFAULT, ...options };
    if (isPlatformBrowser(this.platformId)) {
      this.watch$ = this.changeSlide$.pipe(
        startWith(-1),
        switchMap(index => {
          if (index >= 0) {
            this.options.hide = this.options.active;
            this.options.active = index;
          }
          return interval(this.options.interval).pipe(
            tap(() => {
              if (!window.document.hidden) {
                if (this.options.active + 1 === this.options.slides.length) {
                  this.options.hide = this.options.slides.length - 1;
                  this.options.active = 0;
                } else {
                  this.options.hide = this.options.active;
                  this.options.active++;
                }
              }
            })
          );
        })
      );
    }
  }

  getAllReq() {
    this.getWeather();
    this.getWeatherToday();
    this.getWeatherHourly();
    this.getSearchCity();
  }
  getWeather() {
   this.searchService.weather$.subscribe((weather: any) => {
     if (weather) {
       if (!weather.error) {
        this.weather = weather;
        this.weather.list.map((item: any) => {
          item.dt = new Date(Number((item.dt + '000')));
          item.sunrise = new Date(Number((item.sunrise + '000')));
          item.sunset = new Date(Number((item.sunset + '000')));
        });
        setTimeout(() => {
          const locationData = {
            weather: this.weather,
            hourlyWeather: this.hourlyWeather,
            todayWeather: this.todayWeather,
            images: this.images,
          };
          this.data.slides.push(locationData);
          this.config(this.data);
          this.options.active = this.options.length - 1;
        }, 2000);
       }
     }
   });
  }
  getWeatherToday() {
    this.searchService.todayWeather$.subscribe((weather: any) => {
      if (weather) {
        if (!weather.error) {
         this.todayWeather = weather;
         this.todayWeather.dt = new Date(Number((weather.dt + '000')));
          this.todayWeather.sys.sunrise = new Date(Number((weather.sys.sunrise + '000')));
          this.todayWeather.sys.sunset = new Date(Number((weather.sys.sunset + '000')));
          this.getImageByCity(weather.name);
        }
      }
    });
  }
  getWeatherHourly() {
    this.searchService.hourlyWeather$.subscribe((weather: any) => {
      if (weather) {
        if (!weather.error) {
          this.hourlyWeather = weather;
          this.hourlyWeather.hourly.map((item: any) => {
            item.dt = new Date(Number((item.dt + '000')));
            item.sunrise = new Date(Number((item.sunrise + '000')));
            item.sunset = new Date(Number((item.sunset + '000')));
          });
        }
      }
    });
  }
  getImageByCity(city: string) {
    this.imagesService.getImageByCity(city).subscribe((images: any) => {
      if (images) {
        if (!images.error) {
          this.images = images;
        }
      }
    });
  }

  getSearchCity() {
    setTimeout(() => {
      this.searchService.search('London');
      setTimeout(() => {
        this.searchService.search('New York');
        setTimeout(() => {
          this.searchService.search('Moscow');
          setTimeout(() => {
            this.searchService.search('Paris');
            setTimeout(() => {
              this.searchService.search('Pekin');
            }, 1000);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }


}

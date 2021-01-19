import { WeatherService } from './weather.service';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  weather$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  todayWeather$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  hourlyWeather$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(public weatherService: WeatherService) {
    this.getGeoData();
  }
  getGeoData() {
    const geoSuccess = (position: any) => {
      const coord = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      };
      this.weatherService.getWeatherByCoord(coord).subscribe((weather: any) => {
        this.weather$.next(weather);
      });
      this.weatherService.getWeatherByCoordToday(coord).subscribe((weather: any) => {
        this.todayWeather$.next(weather);
      });
      this.weatherService.getWeatherByCoordHourly(coord).subscribe((weather: any) => {
        this.hourlyWeather$.next(weather);
      });
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
  }
  search(city: string) {
    this.weatherService.getWeatherByCity(city).subscribe((weather: any) => {
      this.weather$.next(weather);
    });
    this.weatherService.getWeatherByCityToday(city).subscribe((weather: any) => {
      this.todayWeather$.next(weather);
      if (weather) {
        if (!weather.error) {
          this.weatherService.getWeatherByCoordHourly(weather.coord).subscribe((hourlyWeather: any) => {
            this.hourlyWeather$.next(hourlyWeather);
          });
        }
      }
    });
  }
}

import { CustomHttp } from './custom-http.service';
import { apiConfig } from './../../../config.example';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(
    private http: CustomHttp,
    private httpClient: HttpClient
  ) {}
  getWeatherByCoord(coord: any) {
    return this.http.get(`${apiConfig.host}/forecast/daily?appid=${apiConfig.appId}&lat=${coord.lat}&lon=${coord.lon}&units=metric&cnt=7`);
  }
  getWeatherByCity(city: string) {
    return this.http.get(`${apiConfig.host}/forecast/daily?appid=${apiConfig.appId}&q=${city}&units=metric&cnt=7`);
  }
  getWeatherByCityToday(city: string) {
    return this.http.get(`${apiConfig.host}/weather?appid=${apiConfig.appId}&q=${city}&units=metric`);
  }
  getWeatherByCoordToday(coord: any) {
    return this.http.get(`${apiConfig.host}/weather?appid=${apiConfig.appId}&lat=${coord.lat}&lon=${coord.lon}&units=metric`);
  }
  getWeatherByCoordHourly(coord: any) {
    return this.http.get(`${apiConfig.host}/onecall?appid=${apiConfig.appId}&lat=${coord.lat}&lon=${coord.lon}&exclude=minutely,daily,current&units=metric`);
  }

}

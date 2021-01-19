import { CustomHttp } from './custom-http.service';
import { apiConfig } from './../../../config.example';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  constructor(
    private http: CustomHttp,
  ) {}

  getImageByCity(city: string) {
    return this.http.get(`https://api.unsplash.com/search/photos?page=1&query=${city}&client_id=${apiConfig.client_id}`);
  }

}

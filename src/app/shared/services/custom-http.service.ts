import { LoaderService } from './loader.service';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CustomHttp {
  constructor(private http: HttpClient, private loader: LoaderService) {}

  get(url: string) {
    this.loader.show(true);
    const answer$ = new BehaviorSubject<any>(null);
    this.http.get(url).subscribe(
      (response: any) => {
        answer$.next(response);
        this.loader.show(false);
        return response;
      }, (error: any) => {
        answer$.next(error);
        this.handleError(error);
        this.loader.show(false);
        return error;
    });
    return answer$;
  }

  handleError(error: any) {
    alert(error.error.message);
  }
}

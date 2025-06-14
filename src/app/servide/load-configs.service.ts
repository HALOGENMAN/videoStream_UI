import { Injectable } from '@angular/core';
import { map, Observable, Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoadConfigsService {
  url: any = 'json/configs.json';
  configSubject = new Subject<any>(); 
  configs: any;
  constructor(
    private http: HttpClient,
  ) {
    
  }

  loadConfigs(): Observable<any> {
    return this.http.get(this.url).pipe(
      map(data => {
        this.configs = data;
        return data;
      })        
    );
  }

  getConfigs(): any {
    return this.configs;
  }
}

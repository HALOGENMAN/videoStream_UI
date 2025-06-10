import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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
    this.configSubject.subscribe((value) => {
      this.configs = value;
    });
  }

  loadConfigs(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url).subscribe({
        next: (data) => {
          this.configSubject.next(data)
          resolve(this.configs);
        },
        error: (error) => {
          console.error('Error loading labels:', error);
          reject(error);
        },
      });
    });
  }

  getConfigs(): any {
    return this.configs;
  }
}

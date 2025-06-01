import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoadConfigsService {
  url:any = 'json/configs.json';
  configs: any;
  constructor(private http:HttpClient) { }
  loadConfigs(): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.get(this.url).subscribe({
        next: (data) => {
          this.configs = data;
          resolve(this.configs);
        },
        error: (error) => {
          console.error('Error loading labels:', error);
          reject(error);
        }
      });
    });
  }

  getConfigs(): any {
    return this.configs;
  }
}

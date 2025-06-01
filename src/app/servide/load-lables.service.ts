import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoadLablesService {
  lablesUrl:any = 'json/lables.json';
  lables: any;
  constructor(private http:HttpClient) { }
  loadLables(): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.get(this.lablesUrl).subscribe({
        next: (data) => {
          this.lables = data;
          resolve(this.lables);
        },
        error: (error) => {
          console.error('Error loading labels:', error);
          reject(error);
        }
      });
    });
  }

  getLabels(): any {
    return this.lables;
  }
}

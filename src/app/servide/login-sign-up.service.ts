import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { LoadConfigsService } from './load-configs.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginSignUpService {
  configs: any;
  constructor(
    private http:BaseService,
    private configService: LoadConfigsService
  ) {
    this.configs = this.configService.getConfigs().endpoints;
  }
  login(payload:any):Observable<any> {
    return this.http.post(this.configs.login, payload); 
  }
}

import { inject, NgModule, provideAppInitializer } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './common/components/nav/nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomepageComponent } from './homepage/homepage.component';
import { VideoComponent } from './common/components/video/video.component';
import { LoginSignUpComponent } from './common/components/login-sign-up/login-sign-up.component';
import { BaseService } from './servide/base.service';
import { LoginSignUpService } from './servide/login-sign-up.service';
import { LoadConfigsService } from './servide/load-configs.service';
import { LoadLablesService } from './servide/load-lables.service';
import { provideHttpClient, withFetch } from '@angular/common/http';

const initializeLables = ():Promise<any> => {
  const labelsService = inject(LoadLablesService);
  return labelsService.loadLables(); 
}

const initializeConfigs = ():Promise<any> => {
  const configService = inject(LoadConfigsService);
  return configService.loadConfigs()
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomepageComponent,
    VideoComponent,
    LoginSignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    // provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideHttpClient(),
    provideAppInitializer(() => initializeLables()),
    provideAppInitializer(() => initializeConfigs()),
  
    BaseService,
    LoginSignUpService,
    LoadLablesService,
    LoadConfigsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

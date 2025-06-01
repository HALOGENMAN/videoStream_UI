import { inject, NgModule,  provideAppInitializer} from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { serverRoutes } from './app.routes.server';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { LoadLablesService } from './servide/load-lables.service';
import {LoadConfigsService} from './servide/load-configs.service';
import { Observable } from 'rxjs';

const initializeLables = ():Promise<any> => {
  const labelsService = inject(LoadLablesService);
  return labelsService.loadLables(); 
}

const initializeConfigs = ():Promise<any> => {
  const configService = inject(LoadConfigsService);
  return configService.loadConfigs(); 
}

@NgModule({
  imports: [AppModule, ServerModule],
  providers: [
    provideServerRouting(serverRoutes),
    provideHttpClient(),
    provideHttpClient(withFetch()),
    provideAppInitializer(() => initializeLables()),
    provideAppInitializer(() => initializeConfigs())
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}

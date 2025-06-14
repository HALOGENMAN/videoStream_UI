import { inject, NgModule,  provideAppInitializer} from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { serverRoutes } from './app.routes.server';
import { Observable } from 'rxjs';
import { LoadConfigsService } from './servide/load-configs.service';
import { provideHttpClient } from '@angular/common/http';


@NgModule({
  imports: [AppModule, ServerModule],
  providers: [
    provideServerRouting(serverRoutes),
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}

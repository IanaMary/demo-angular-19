import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { appProviders } from './app/providers';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), ...appProviders]
}).catch(err => console.error(err));

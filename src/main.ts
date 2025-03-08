import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig, loadConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

loadConfig().then(() => {
  bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error(err));
});

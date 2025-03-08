import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { authInterceptor } from './services/auth/auth.interceptor';

export async function loadConfig(): Promise<any> {
  try {
    const response = await fetch('/config/config.json');
    const config = await response.json();
    (window as any).appConfig = config;
    return config;
  } catch (error) {
    console.error('Failed to load config.json', error);
    (window as any).appConfig = {};
    return {};
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: 'APP_CONFIG',
      useFactory: () => (window as any).appConfig,
    }
  ],
};

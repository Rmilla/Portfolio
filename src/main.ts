import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';

// Fusionner les fournisseurs avec appConfig si nécessaire
const mergedConfig = {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []), // Ajoutez les fournisseurs existants de appConfig s'ils existent
    importProvidersFrom(BrowserAnimationsModule),
    // autres providers ici
  ],
};

bootstrapApplication(AppComponent, mergedConfig)
  .catch((err) => console.error(err));

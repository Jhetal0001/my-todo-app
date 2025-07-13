import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { addIcons } from 'ionicons';
import { options, add, trash, create, close, save, chevronForwardOutline, chevronBackOutline } from 'ionicons/icons';

addIcons({
  'options': options,
  'add': add,
  'trash': trash,
  'create': create,
  'close': close,
  'save': save,
  'chevronForwardOutline': chevronForwardOutline,
  'chevronBackOutline': chevronBackOutline
});

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, appConfig);

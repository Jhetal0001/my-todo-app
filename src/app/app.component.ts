import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { RemoteConfigService } from './services/remote-config.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private remoteConfigService: RemoteConfigService, private translate: TranslateService) {
    this.initializeApp();
  }

  initializeApp() {
    this.remoteConfigService.initialize();
    this.translate.setDefaultLang(environment.config.language);
  }
}

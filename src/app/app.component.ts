import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { RemoteConfigService } from './services/remote-config.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private remoteConfigService: RemoteConfigService) {
    this.initializeApp();
  }

  initializeApp() {
    this.remoteConfigService.initialize();
  }
}

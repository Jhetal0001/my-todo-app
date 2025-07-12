import { Injectable } from '@angular/core';
import { fetchAndActivate, getBoolean, getRemoteConfig, RemoteConfig } from '@angular/fire/remote-config';

@Injectable({
  providedIn: 'root'
})
export class RemoteConfigService {
  private remoteConfig: RemoteConfig;

  constructor() {
    this.remoteConfig = getRemoteConfig();
    this.remoteConfig.settings.minimumFetchIntervalMillis = 3600000;
  }

  async initialize() {
    try {
      const activated = await fetchAndActivate(this.remoteConfig);
      if (activated) {
        console.log('Remote Config: Nuevos valores activados.');
      } else {
        console.log('Remote Config: Usando valores cacheados.');
      }
    } catch (error) {
      console.error('Remote Config: No se pudo hacer fetch.', error);
    }
  }

  isCategoryFilterEnabled(): boolean {
    return getBoolean(this.remoteConfig, 'enable_category_filter');
  }
}

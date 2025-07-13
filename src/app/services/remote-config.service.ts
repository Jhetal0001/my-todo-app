import { Injectable } from '@angular/core';
import {
  fetchAndActivate,
  getBoolean,
  RemoteConfig,
} from '@angular/fire/remote-config';
import { environment as ev } from 'src/environments/environment'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RemoteConfigService {
  private readonly _param = new BehaviorSubject<boolean>(false);
  readonly param$ = this._param.asObservable();

  constructor(private remoteConfig: RemoteConfig) {
    this.remoteConfig.settings.minimumFetchIntervalMillis = 10000;
  }

  async initialize() {
    try {
      const activated = await fetchAndActivate(this.remoteConfig);
      if (activated) {
        this.isCategoryFilterEnabled();
        console.log('Remote Config: Nuevos valores activados.');
      } else {
        console.log('Remote Config: Usando valores cacheados.');
      }
    } catch (error) {
      console.error('Remote Config: No se pudo hacer fetch.', error);
    }
  }

  isCategoryFilterEnabled() {
    const param = getBoolean(this.remoteConfig, ev.paramsRemotes.categoriaFilter);
    this._param.next(param);
  }
}

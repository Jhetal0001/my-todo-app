// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import config from "capacitor.config";

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyA9woaxApWD0unySXU10h7Kp31nFkOR1gc",
    authDomain: "prueba-tecnica-60128.firebaseapp.com",
    projectId: "prueba-tecnica-60128",
    storageBucket: "prueba-tecnica-60128.firebasestorage.app",
    messagingSenderId: "1060549640723",
    appId: "1:1060549640723:web:d0d96c78ec7bdf4f8db5e6"
  },
  paramsRemotes: {
    categoriaFilter: 'enable_category_filter'
  },
  config: {
    language: 'es'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  isDebugMode: true,
  environmentName: "local",

  /**
   * Represents how long user can be inactive, milliseconds
   */
  idleTimeOutDuration: 25 * 60 * 1000,

  baseURL: 'http://localhost:8083/thcr-ui-api/',
  clientID: '0oa6qxunyxp4pVT7m1d7',
  oktaIssuerURL: 'https://dev.iamonline.hhs.state.tx.us/oauth2/aus74pgfllsDzmD3c1d7',
  postLogoutRedirectURL: 'https://dev.iamonline.hhs.state.tx.us/login/signout',
  individualSearchURL: 'api/individual/individuals',
  edgeDispositionsURL: 'api/edg/dispositions',
  generateReport: 'api/report/pdfreport',
  userActivityURL: 'resources/test'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

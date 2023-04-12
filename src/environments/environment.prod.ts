export const environment = {
  production: true,
  environmentName: "prod",
  isDebugMode: false,

  /**
   * Represents how long user can be inactive, milliseconds
   */
  idleTimeOutDuration: 25 * 60 * 1000,

  baseURL: '/thcr-ui-api/',
  clientID: '0oa6qxunyxp4pVT7m1d7',
  oktaIssuerURL: 'https://dev.iamonline.hhs.state.tx.us/oauth2/default',
  postLogoutRedirectURL: 'https://dev.iamonline.hhs.state.tx.us/login/signout',
  individualSearchURL: 'api/individual/individuals',
  edgeDispositionsURL: 'api/edg/dispositions',
  generateReport: 'api/report/pdfreport',
  userActivityURL: 'resources/test'

};

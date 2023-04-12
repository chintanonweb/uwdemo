export const environment = {
  production: true,
  environmentName: "last",
  isDebugMode: true,

  /**
   * Represents how long user can be inactive, milliseconds
   */
  idleTimeOutDuration: 25 * 60 * 1000,


  baseURL: '/thcr-ui-api/',
  clientID: '0oa7ih1hbmsuLVRtf1d7',
  oktaIssuerURL: 'https://stage.iamonline.hhs.state.tx.us/oauth2/aus7ihfzj6LBYZipY1d7',
  postLogoutRedirectURL: 'https://stage-thcr-ui.hhs.state.tx.us/login/signout',
  individualSearchURL: 'api/individual/individuals',
  edgeDispositionsURL: 'api/edg/dispositions',
  generateReport: 'api/report/pdfreport',
  userActivityURL: 'resources/test'
};

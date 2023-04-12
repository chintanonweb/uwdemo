export const environment = {
  production: true,
  environmentName: "itst",
  isDebugMode: false,

  /**
   * Represents how long user can be inactive, milliseconds
   */
  idleTimeOutDuration: 25 * 60 * 1000,


  baseURL: '/thcr-ui-api/',
  oktaIssuerURL: 'https://test.iamonline.hhs.state.tx.us/oauth2/aus77asvegdufOVrY1d7',
  clientID: '0oa773z1y9K87HIiO1d7',
  postLogoutRedirectURL: 'https://test.iamonline.hhs.state.tx.us/login/signout',
  individualSearchURL: 'api/individual/individuals',
  edgeDispositionsURL: 'api/edg/dispositions',
  generateReport: 'api/report/pdfreport',
  userActivityURL: 'resources/test'

};

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { HttpModule } from '@angular/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { CustomHttpInterceptor } from './core/interceptors/custom-http-interceptor';
import { IndividualSearchService } from './pages/individual-search/individual-search.service';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomNgbDateParserFormatter } from './core/utils/custom-ngb-date-parser-formatter';
import { CustomInputBaseComponent } from './core/form-inputs/custom-input-base/custom-input-base.component';
import { CustomInputTextComponent } from './core/form-inputs/custom-input-text/custom-input-text.component';
import { CustomInputDateComponent } from './core/form-inputs/custom-input-date/custom-input-date.component';
import { CommonModule } from '@angular/common';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CaseInquiryComponent } from './pages/case-inquiry/case-inquiry.component';
import { IndividualSearchComponent } from './pages/individual-search/individual-search.component';
import { LoggerService } from './core/services/logger/logger.service';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule, NgxUiLoaderConfig, SPINNER } from 'ngx-ui-loader';
import { AppService } from './app.service';
import { CaseInquiryService } from './pages/case-inquiry/case-inquiry.service';
import { CaseDetailsComponent } from './pages/case-details/case-details.component'
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { environment } from 'src/environments/environment';

const oktaAuth = new OktaAuth({
  issuer: environment.oktaIssuerURL,
  clientId: environment.clientID,
  postLogoutRedirectUri: environment.postLogoutRedirectURL,
  redirectUri: window.location.origin + '/thcrui/login/callback',
  tokenManager: {
    autoRenew: true
  }
});

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsType: SPINNER.pulse,
  hasProgressBar: false
};

@NgModule({
  declarations: [
    AppComponent,
    CustomInputBaseComponent,
    CustomInputTextComponent,
    CustomInputDateComponent,
    CaseInquiryComponent,
    IndividualSearchComponent,
    CaseDetailsComponent //needs to be removed.
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgbModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    //NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule,
    OktaAuthModule
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: { oktaAuth } },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
    LoggerService,
    IndividualSearchService,
    CaseInquiryService,
    AppService,
    {
      // add this for feature modules. see  https://plnkr.co/edit/NDBiq59OOYoHpMYgFgOe?p=preview
      provide: NgbDateParserFormatter,
      useFactory: () => new CustomNgbDateParserFormatter('MM/dd/yyyy')
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}

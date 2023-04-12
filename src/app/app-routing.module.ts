import { NgModule } from '@angular/core';
import { Routes, CanActivate, RouterModule } from '@angular/router';
import { CaseInquiryComponent } from './pages/case-inquiry/case-inquiry.component';
import { IndividualSearchComponent } from './pages/individual-search/individual-search.component';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { environment } from 'src/environments/environment';
import { AuthGuard } from './auth-guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/individual-search', pathMatch: 'full'
  },
  {
    path: 'individual-search',
    component: IndividualSearchComponent,
    canActivate: [(environment.environmentName !== 'local') ? OktaAuthGuard : AuthGuard]
  },
  {
    path: 'case-inquiry',
    component: CaseInquiryComponent
  },
  {
    path: 'case-inquiry/:caseNumber',
    component: CaseInquiryComponent
  },
  {
    path: 'login/callback',
    component: OktaCallbackComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

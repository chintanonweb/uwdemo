import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppCustomFieldsService } from '../core/services/fields/app-custom-fields.service';
import { BaseFeatureComponent } from './components/base-feature/base-feature.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DisableSubmitButtinDirectiveDirective } from './utils/disable-submit-buttin-directive.directive';
import { AppLabelsService } from '../core/services/labels/app-labels.service';
import { LabelsService } from '../core/services/labels.service';
import { LoggerService } from '../core/services/logger.service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component'
import { RouterModule } from '@angular/router';
import { CaseDetailsTableComponent } from './components/case-details-table/case-details-table.component';


@NgModule({
  declarations: [
    HeaderComponent,
    NavBarComponent,
    CaseDetailsTableComponent,
    BaseFeatureComponent,
    NotFoundComponent,
    DisableSubmitButtinDirectiveDirective
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule
  ],
  exports:[
    HeaderComponent,
    NavBarComponent, 
    CaseDetailsTableComponent
  ],
  entryComponents:[
    HeaderComponent,
    CaseDetailsTableComponent,
    NavBarComponent
  ],
  providers:[
    AppCustomFieldsService,
    AppLabelsService,
    LabelsService,
    LoggerService
  ]
})
export class CoreModule { }

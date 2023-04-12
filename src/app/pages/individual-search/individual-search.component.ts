import { Component, OnInit } from '@angular/core';
import { IndividualSearchService } from './individual-search.service';
import { LoggerService } from '../../core/services/logger/logger.service';
import { Router } from '@angular/router';
import { AppCustomFieldsService } from '../../core/services/fields/app-custom-fields.service';
import { AppLabelsService } from '../../core/services/labels/app-labels.service';
import { BaseFeatureComponent } from 'src/app/core/components/base-feature/base-feature.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-individual-search',
  templateUrl: './individual-search.component.html',
  styleUrls: ['./individual-search.component.scss'],
})

export class IndividualSearchComponent extends BaseFeatureComponent implements OnInit {
  indSearchList = []
  searchFlag: boolean = false;
  noResultsMsg: string = '';
  errorFlag: boolean = false;
  errorMsg: string = '';
  formData: FormGroup;
  enableWarning: boolean = false;
  validationMessage = '';
  constructor(
    private individualSearchService: IndividualSearchService,
    private fb: FormBuilder,
    private logger: LoggerService,
    private router: Router,
    public fields: AppCustomFieldsService,
    public labels: AppLabelsService,
    private ngxService: NgxUiLoaderService
  ) {
    super();
  }

  ngOnInit() {
    this.formData = this.fb.group({
      firstName: this.defaultFormControl__change,
      lastName: this.defaultFormControl__change,
      middleName: this.defaultFormControl__change,
      indvNumber: this.defaultFormControl__change,
      ssn: this.defaultFormControl__change,
    })
    let searchData = this.individualSearchService.getSearchData();
    console.log(searchData)
    if (searchData) {
      if (searchData.input.individualInquiryInput.firstName)
        this.formData.get('firstName').patchValue(searchData.input.individualInquiryInput.firstName)
      if (searchData.input.individualInquiryInput.individualId)
        this.formData.get('indvNumber').patchValue(searchData.input.individualInquiryInput.indvNumber)
      if (searchData.input.individualInquiryInput.lastName)
        this.formData.get('lastName').patchValue(searchData.input.individualInquiryInput.lastName)
      if (searchData.input.individualInquiryInput.midName)
        this.formData.get('middleName').patchValue(searchData.input.individualInquiryInput.midName)
      if (searchData.input.individualInquiryInput.ssn)
        this.formData.get('ssn').patchValue(searchData.input.individualInquiryInput.ssn)
    }
    if (this.individualSearchService.getSearchResultsData()) {
      this.indSearchList = this.individualSearchService.getSearchResultsData()
      this.searchFlag = true
    }
  }
  inputValidation() {
    this.errorMsg = '';
    this.noResultsMsg = '';
    this.validationMessage = '';
    const firstNameVal = this.formData.get('firstName').value;
    const lastNameVal = this.formData.get('lastName').value;
    const middleNameVal = this.formData.get('middleName').value;
    const indIdVal = this.formData.get('indvNumber').value;
    const ssnVal = this.formData.get('ssn').value;
    if ((indIdVal || ssnVal)) {
      this.enableWarning = false;
      return true;
    } else {
      if (firstNameVal && lastNameVal) {
        this.enableWarning = false;
        return true;
      } else {
        if (middleNameVal) {
          if (firstNameVal && lastNameVal) {
            this.enableWarning = false;
            return true;
          }
          else {
            this.enableWarning = true;
            this.validationMessage = 'please enter either Firstname and Lastname or Individual ID or SSN';
            return false;
          }
        } else {
          this.enableWarning = true;
          this.validationMessage = 'please enter either Firstname and Lastname or Individual ID or SSN';
          return false;
        }
      }
    }
  }


  search() {
    if (this.inputValidation()) {
      this.searchFlag = true;
      this.indSearchList = [];
      this.errorFlag = false;
      // if((( this.formData.value.lastName && this.formData.controls['lastName'].errors &&  this.formData.controls['lastName'].errors['invalidName']) || ( this.formData.value.middleName && this.formData.controls['middleName'].errors && this.formData.controls['middleName'].errors['invalidName']) || (this.formData.value.firstName && this.formData.controls['firstName'].errors && this.formData.controls['firstName'].errors['invalidName']) || (this.formData.value.indId && this.formData.controls['indId'].errors && this.formData.controls['indId'].errors['invalidNumberLength']) || (this.formData.value.ssn && this.formData.controls['ssn'].errors && this.formData.controls['ssn'].errors['invalidNumberLength'])))
      // {
      //   return;
      // }

      let inputData = {
        "input": {
          "individualInquiryInput": {
            "firstName": this.formData.value.firstName ? this.formData.value.firstName.trim() : null,
            "individualId": this.formData.value.indvNumber ? this.formData.value.indvNumber.trim() : null,
            "lastName": this.formData.value.lastName ? this.formData.value.lastName.trim() : null,
            "midName": this.formData.value.middleName ? this.formData.value.middleName.trim() : null,
            "prefixName": "",
            "ssn": this.formData.value.ssn ? this.formData.value.ssn.trim() : null,
            "sufxName": ""
          }
        }
      };
      this.ngxService.start();
      this.individualSearchService.setSearchData(inputData);
      console.log(this.individualSearchService.getSearchData())
      this.individualSearchService.getData(inputData).subscribe(res => {
        this.ngxService.stop();
        this.indSearchList = res.data.output.individualInquiryInfos;
        this.individualSearchService.setSearchResultsData(this.indSearchList)
        if (!this.indSearchList.length) {
          this.noResultsMsg = 'No results found. May be this individual is not part of any case. Please change your search criteria and search again...'
        }
      }, err => {
        this.ngxService.stop();
        this.errorFlag = true;
        this.errorMsg = err.message;
      });
    }


  }

  gotoCaseInquiry(caseNumber) {
    this.router.navigate(['case-inquiry', caseNumber])
  }

  formElemChange($event) {
    this.logger.debug('onChange');
  }

}

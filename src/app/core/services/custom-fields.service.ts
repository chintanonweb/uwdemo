import { Injectable, Input } from '@angular/core';
import { ICustomField } from "../model/custom-field";
import { RegExpressions } from '../utils/constants';
import { LabelsService } from './labels.service';


export const TEXTBOX_CLASS_NAME = 'form-control';
export const SELECT_CLASS_NAME = 'form-control';

export const CASE_NUMBER_MAXLENGTH = 10;
export const INDV_NUMBER_MAXLENGTH = 10;
export const LAST_NAME_MAXLENGTH = 30;
export const FIRST_NAME_MAXLENGTH = 30;
export const SSN_MAXLENGTH = 11;
export const MIDDLE_NAME_MAXLENGTH = 30;

@Injectable()
export class CustomFieldsService {

  constructor(public labels: LabelsService) {

  }
  get caseNumber(): ICustomField {
    return {
      label: this.labels.caseNumber,
      placeholder: '9999999999',
      maxlength: CASE_NUMBER_MAXLENGTH,
      class: TEXTBOX_CLASS_NAME,
      error: 'Case Number must be 10 digit numeric',
      requiredMsg: 'Please enter a TIERS case number',
      regexp: RegExpressions.TEN_DIGIT_NUMBER
    };
  }
  
  

  get indvNumber(): ICustomField {
    return {
      label: this.labels.indvNumber,
      placeholder: '9999999999',
      maxlength: INDV_NUMBER_MAXLENGTH,
      class: TEXTBOX_CLASS_NAME,
      error: 'Individual # must be minimum 9 or maximum 10 digit numeric',
      requiredMsg: 'Please enter a Individual #',
      regexp: RegExpressions.INDIV_NUMBER
    };
  }

 

  get lastName(): ICustomField {
    return {
      label: this.labels.lastName,
      placeholder: 'Last Name',
      maxlength: LAST_NAME_MAXLENGTH,
      class: TEXTBOX_CLASS_NAME,
      error: 'Please enter a valid last name',
      requiredMsg: 'Please enter Last name',
      regexp: RegExpressions.LAST_NAME_WITH_SINGLE_QUOTE
    };
  }

  get firstName(): ICustomField {
    return {
      label: this.labels.firstName,
      placeholder: 'First Name',
      maxlength: FIRST_NAME_MAXLENGTH,
      class: TEXTBOX_CLASS_NAME,
      error: 'Please enter a valid first name',
      requiredMsg: 'Please enter First name',
      regexp: RegExpressions.FIRST_NAME_WITH_SINGLE_QUOTE
    };
  }
  
  get ssn(): ICustomField {
    return {
      label: this.labels.ssn,
      placeholder: 'XXX-XX-XXXX',
      maxlength: SSN_MAXLENGTH,
      class: TEXTBOX_CLASS_NAME,
      error: 'Please enter a valid SSN',
      requiredMsg: 'Please enter SSN',
      regexp: RegExpressions.SSN_VALIDATION_ALL
    };
  }

  get middleName() {
    return {
      // label: this.labels.middleName,
      label: 'Middle Name',
      placeholder: 'Middle Name',
      maxlength: MIDDLE_NAME_MAXLENGTH,
      class: TEXTBOX_CLASS_NAME,
      error: 'Please enter a valid middle name',
      requiredMsg: 'Please enter Middle name',
      regexp: RegExpressions.MIDDLE_NAME_WITH_SINGLE_QUOTE
    };
  }
  
}

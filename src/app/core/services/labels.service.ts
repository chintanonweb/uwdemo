import { Injectable } from '@angular/core';

@Injectable()
export class LabelsService {

  constructor() { }
  readonly caseNumber = 'Case #';
  readonly firstName = 'First Name';
  readonly lastName = 'Last Name';
  readonly indvNumber = 'Individual #';
  readonly ssn = 'SSN';
}

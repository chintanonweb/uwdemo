import {
    //NgbDateParserFormatter,
    NgbDateStruct
  } from '@ng-bootstrap/ng-bootstrap';
  import { DatePipe } from '@angular/common';
  
  export class CustomNgbDateParserFormatter /*extends NgbDateParserFormatter*/ {
    datePipe = new DatePipe('en-US');
    constructor(private dateFormatString: string) {
      //super();
    }
    format(date: NgbDateStruct): string {
      if (date === null) {
        return '';
      }
      try {
        return this.datePipe.transform(
          new Date(date.year, date.month - 1, date.day),
          this.dateFormatString
        );
      } catch (e) {
        // console.error(
        //   'CustomNgbDateParserFormatter.format(): Error while formatting the date. ',
        //   e
        // );
        return '';
      }
    }
    parse(value: string): NgbDateStruct {
      let returnVal: NgbDateStruct;
      if (!value) {
        returnVal = null;
      } else {
        try {
          const dateParts = this.datePipe.transform(value, 'M-d-y').split('-');
          returnVal = {
            year: parseInt(dateParts[2], 10),
            month: parseInt(dateParts[0], 10),
            day: parseInt(dateParts[1], 10)
          };
        } catch (e) {
          // console.error(
          //   'CustomNgbDateParserFormatter.parse(): Error while parsing the date. ',
          //   e
          // );
          returnVal = null;
        }
      }
      return returnVal;
    }
    

   /* format(date: NgbDateStruct): string {
      let stringDate: string = ""; 
      if(date) {         
          stringDate += isNumber(date.month) ? padNumber(date.month) + "/" : "";
          stringDate += isNumber(date.day) ? padNumber(date.day) + "/" : "";
          stringDate += date.year;
      }
      console.log(" format date :::" + stringDate);
      return stringDate;
  }*/

  
  }

function isNumber(value: any): boolean {
    return !isNaN(toInteger(value));
}

function toInteger(value: any): number {
    return parseInt(`${value}`, 10);
}
function padNumber(value: number) {
  if (isNumber(value)) {
      return `0${value}`.slice(-2);
  } else {
      return "";
  }
}
  
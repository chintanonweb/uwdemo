import { Component, ElementRef, OnInit, Input, forwardRef, ViewEncapsulation, Output, ViewChild, EventEmitter } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl,
  Validator
} from '@angular/forms';
import { CustomInputBaseComponent } from '../custom-input-base/custom-input-base.component';
import { CustomNgbDateParserFormatter } from '../../utils/custom-ngb-date-parser-formatter';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

//import { NgbDateMomentParserFormatter } from './NgbDateMomentParserFormatter';


const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomInputDateComponent),
  multi: true
};

const CUSTOM_INPUT_CONTROL_VALUE_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => CustomInputDateComponent),
  multi: true
};

const now = new Date();

@Component({
  selector: 'custom-input-date',
  templateUrl: './custom-input-date.component.html',
  styleUrls: ['./custom-input-date.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR,
    CUSTOM_INPUT_CONTROL_VALUE_VALIDATOR],
  encapsulation: ViewEncapsulation.None,
  host: {
    '(document:click)': 'handleOutsideClick($event)',
  }
})

export class CustomInputDateComponent extends CustomInputBaseComponent implements OnInit, ControlValueAccessor, Validator {
  @Input() minDate: any; // min date for dob text field
  @Input() maxDate: any; // max date for dob text field
  @Output() dateValidationError = new EventEmitter();
  err_id:string;
  startDay = "7";
  calId = "ngbCal";
  maskedValue;
 
 //model = {year: now.getFullYear(), month:now.getMonth()+1, day: now.getDate()};
 
  constructor(private myElement: ElementRef, config: NgbDatepickerConfig) {
    super();
    config.firstDayOfWeek = 7;
    
   // new CustomNgbDateParserFormatter("MM/dd/yyyy");

    this.elementRef = myElement;

  }
  public elementRef;

  defaultDateSet;

  ngOnInit() {
    /*this.defaultDateSet = this.field.defaultDate;
    // console.log("model::"+this.model.year); 
    if(this.field.defaultDate != null){
    this.defaultDateSet = this.field.defaultDate;
    this.onTouched(true);
    }*/
    this.err_id = "err_"+this.id;
  }
  @ViewChild('cal',{static:true}) cal;
  @ViewChild('d',{static:true}) d: ElementRef;
  labelclass = 'labelClass';

  dynamicId;
  dateText: FormControl;
  con = new CustomNgbDateParserFormatter("MM/dd/yyyy");
  selDate: Date;
  selMaxDate: Date;
  selMinDate:Date;

  onClick(id) {
    console.log(" Entered on click on icon" + id);
    this.dynamicId = id;
    this.cal.toggle();
  }
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  handleOutsideClick(e) {
    //console.log(" Entered on handleOutsideClick");
    if (!this.myElement.nativeElement.contains(event.target) && this.cal.isOpen()) {
      this.cal.close();
    }
  }

  onDateChange(date: NgbDateStruct) {
    //  console.log('CustomInputComponent: onDateChange: ' + JSON.stringify(date));
    // this.value = date;
    /*if(this.value != null ){
      this.validate(this.value) ;
      console.log("entered here ******");
      this.error = "Please enter valid date format";
    }*/
    //this.validate(this.value) ;
    
      this.onTouched(null);
  }

  formatdate(date) {
    //this.error='';
    //this.value = date;
    //console.log('CustomInputComponent: formatdate: ' + JSON.stringify(date.value) + "**" + this.maskedValue.length);
    if (this.required && date == null){
      //console.log(" **********************");
      this.error = "Please enter value in required field";
    }
    else if(this.maskedValue != null && this.maskedValue != '' && this.maskedValue.length != 10){
      this.error="Please enter a valid date in the format mm/dd/yyyy";
      this.d.nativeElement.value = this.maskedValue;
      //this.value = null;
    }
    /*else
      this.d.nativeElement.value = this.maskedValue;*/       
    if (date != null && this.error =='') {
      this.error = isValidDate(JSON.stringify(date.value));
      if (this.error == '') {
        //this.selDate = new Date(JSON.stringify(date.value.year + "/" + date.value.month + "/" + date.value.day));
        let dateString = date.value.year + "/" + date.value.month + "/" + date.value.day;
        this.selDate = new Date(dateString);
        this.selMaxDate = new Date(this.con.format(this.maxDate));
        this.selMinDate = new Date(this.con.format(this.minDate));
        //console.log(" dates" +  this.selDate  + " AND  " + this.selMaxDate);
        if (this.selDate > this.selMaxDate) {
          this.error = "Future date is not allowed";
        }
        if(this.selDate < this.selMinDate){
          this.error = "Past date is not allowed";
        }
      }
    }
       if(this.error == ''){
         this.onDateChange(date);
       }
       this.dateValidationError.emit(this.error);
      // console.log(" ******** Error *******" + this.error);
  }

  get dobMaxDate() {
    const d = new Date();
    return {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate()
    };
  }

  get dobMinDate() {
    const d = new Date();
    return {
      year: 1900,
      month: 1,
      day: 1
    };
  }

  //(keyup)="validDate($event)"
  validDate(event) {
    //console.log(" Target**" + event.target.value);
    this.maskDate(event);
  }

  maskDate(data) {
    //console.log(" keycode ****" + data.keyCode);
    /*if (data.keyCode != '8') {
      //console.log(" Data Entered****" + data.target.value);
      if (data.target.value != null) {
        let val = data.target.value.replace(/\D/g, '');
        let newVal = '';
        if (val.length > 4) {
          // this.value = val;
        }
        if ((val.length > 1) && (val.length < 3)) {
          newVal += val.substr(0, 2) + '/';
          val = val.substr(2);
        }
        if (val.length > 4) {
          newVal += val.substr(0, 2) + '/';
          newVal += val.substr(2, 2) + '/';
          val = val.substr(4, 4);
        }
        newVal += val;
        // if(newVal.length==10)
        // this.value = newVal.substring(0, 10);
        this.d.nativeElement.value = newVal;
        this.maskedValue = newVal;
        //console.log(" Value ***" + newVal + "nativeElement.value " +  this.d.nativeElement.value);
      }
    }
    else
      this.maskedValue = data.target.value;*/

      if (this.d.nativeElement.value != null) {
        //let val = this.d.nativeElement.value.replace(/\D/g, '');
        let val = this.d.nativeElement.value;
        if (((data.keyCode >= 48 && data.keyCode <= 57) || data.keyCode == 8 || data.keyCode <= 37 || data.keyCode <= 39 || (data.keyCode >= 96 && data.keyCode <= 105))) {
          if ((val.length == 2 || val.length == 5) && data.keyCode != 8) {
            val += "/";
            this.d.nativeElement.value = val;
          }
        }        
        this.maskedValue = val;
      }

  }

}

function isValidDate(date) {
  var valid = true;
  var msg = "";
  // var json = JSON.parse(date);
  //console.log("**** json ***" + date);
  var json = JSON.parse(date);
  if (json != 'undefined' && json !=null) {
    var month = json.month;
    var year = json.year;
    var day = json.day;
    //console.log(" month : " + month + ":: year :::" + year + " :: day ::" + day);

    if (isNaN(month) || isNaN(day) || isNaN(year)) {
      msg = "Please enter a valid date in the format mm/dd/yyyy";
      return msg;
    }
    if(year < 1900 || year > 2100){
      //valid=false;
      msg = "Please enter valid 4 digit year between 1900 and 2100";
      return msg;
    }
    else if ((month < 1) || (month > 12)) valid = false;
    else if ((day < 1) || (day > 31)) valid = false;
    else if (((month == 4) || (month == 6) || (month == 9) || (month == 11)) && (day > 30)) valid = false;
    else if ((month == 2) && (((year % 400) == 0) || ((year % 4) == 0)) && ((year % 100) != 0) && (day > 29)) valid = false;
    else if ((month == 2) && ((year % 100) == 0) && (day > 29)) valid = false;
    else if ((month == 2) && (day > 28)) valid = false;

    if (!valid) {
      msg = "Please enter a valid date in the format mm/dd/yyyy";

    }
    return msg;
  }

  //return valid;
}


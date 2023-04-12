import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ICustomField } from '../../model/custom-field';
import { CustomNgbDateParserFormatter } from '../../utils/custom-ngb-date-parser-formatter';

const noop = () => {};
const now = new Date();

@Component({
  selector: 'custom-input-base',
  templateUrl: './custom-input-base.component.html',
  styleUrls: ['./custom-input-base.component.scss']
})
export class CustomInputBaseComponent implements OnInit {

  @Input() id: string;
  @Input() required: boolean;
  @Input() field: ICustomField; 
  @Input() maxLength: number;
  @Input() class:String;
  @Input() readonly:boolean;
  @Input() disabled:boolean;
  @Input() defValue:string;
  
  constructor() { }

  ngOnInit() {
  }

    // Validation error message
  error: string;

  // Internal data model
  private _value: any = '';

  // Placeholders for the callbacks
  public _onTouchedCallback: (_: any) => void = noop;
  private _onChangeCallback: (_: any) => void = noop;

  // get accessor
  get value(): any {
    return this._value;
  }

    // set accessor including call the onchange callback
    set value(v: any) {
      if (v !== this._value) {
        this._value = v;
        this._onChangeCallback(v);
      }
    }
  
    // Set touched on blur
    onTouched(event) {
      console.log(" Onblur :::" + event);
    /*  if((event.value == null || event.value =='') && this.required && (this.value == null ||
     this.value == '')){
        this.error ='Please enter value in required field';
        console.log("required field check in ontouch event");
      }*/
      this._onTouchedCallback(null);
    }
  
    // From ControlValueAccessor interface
    writeValue(value: any) {
      this._value = value;
    }
  
    // From ControlValueAccessor interface
    registerOnChange(fn: any) {
      this._onChangeCallback = fn;
    }
  
    // From ControlValueAccessor interface
    registerOnTouched(fn: any) {
      this._onTouchedCallback = fn;
    }
    customDate = new CustomNgbDateParserFormatter("MM/dd/yyyy");
    // Validates the form, returns null when valid else the validation object
    public validate(c: FormControl) {
      // clear the variable first
      this.error = '';
      // first check if the control has a value
      //if(this.value!= null ){
       // if ( this.value.trim() && this.value.trim().length > 0) {
        if ( this.value && this.value.length > 0) {
          if (this.field.regexp) {
            // match the control value against the regular expression
            const matches = this.field.regexp.test(this.value.trim());
            this.error = matches ? null : this.field.error;
          // console.log(" Field Validation: :::" + this.value);
            return matches ? null : { message: { value: this.field.error } };
          }
        }
    //}
    //else if(this.required &&  c.dirty && (!c.untouched || c.pristine) && (this.value==null || this.value==''
    else if(this.required &&  (c.dirty || (c.pristine && !c.untouched)) &&   (this.value==null || this.value==''))
    {
        console.log(" Required field check");
  
       if(this.field.requiredMsg != null)
        this.error=this.field.requiredMsg;
      else
        this.error = 'Please enter value in required field';
       // return { value: this.error };
       
      } 
      return null;
    }

}

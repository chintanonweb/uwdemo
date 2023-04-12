import { Component, OnInit,Input,forwardRef,ViewEncapsulation } from '@angular/core';
import { CustomInputBaseComponent } from '../custom-input-base/custom-input-base.component';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl,
  Validator
} from '@angular/forms';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomInputTextComponent),
  multi: true
};

const CUSTOM_INPUT_CONTROL_VALUE_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => CustomInputTextComponent),
  multi: true
};
const ssnMask ="ssnMask";
@Component({
  selector: 'custom-input-text',
  templateUrl: './custom-input-text.component.html',
  styleUrls: ['./custom-input-text.component.scss'],
  providers:[ CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR,
    CUSTOM_INPUT_CONTROL_VALUE_VALIDATOR],
    encapsulation:ViewEncapsulation.None
    
    
})
export class CustomInputTextComponent extends CustomInputBaseComponent implements OnInit, ControlValueAccessor, Validator  {
  @Input() mask:string;
  err_id:string;
  constructor() {

    super();
  }
labelclass='labelClass'; 

  ngOnInit() {
    this.err_id = "err_"+this.id;
  }

  maskData(data){  
    if(this.mask == ssnMask){
      console.log(" keycode ****" + data.keyCode);
      if(data.keyCode != '8'){
        console.log(" Data ****" + data.target.value);
        if(data.target.value!= null){
          let val = data.target.value.replace(/\D/g, '');
          let newVal = '';
          if(val.length > 4) {
            this.value = val;
          }
          if((val.length > 3) && (val.length < 6)) {
            newVal += val.substr(0, 3) + '-';
            val = val.substr(3);
          }
          if (val.length > 5) {
            newVal += val.substr(0, 3) + '-';
            newVal += val.substr(3, 2) + '-';
            val = val.substr(5);
          }
          newVal += val;
          this.value = newVal.substring(0, 11);
          console.log(" Value ***" + this.value);
        }
      }
  }
}
}



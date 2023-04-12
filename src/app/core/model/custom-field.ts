import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct";

export interface ICustomField {
    type?:string;
    label?: string;
    placeholder?: string;
    minlength?:number;
    maxlength?: number;
    class?: string;
    error?: string;
    requiredMsg?:string;
    regexp?: RegExp;
    defaultCheck?:boolean;
    rows?:string;
    defaultDate?:NgbDateStruct;
 
  }
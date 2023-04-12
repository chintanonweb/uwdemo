import { Injectable } from "@angular/core";
import { CustomFieldsService } from '../custom-fields.service';
import { ICustomField } from '../../model/custom-field';
import { AppLabelsService } from "../labels/app-labels.service";
//import { CustomFieldsService, ICustomField } from "hhsc-ui-lib";

@Injectable()
export class AppCustomFieldsService extends CustomFieldsService {
  constructor(public labels: AppLabelsService) {
    super(labels);
    console.log("AppCustomFieldsService: singleton object has been created");
  }

  get startDate(): ICustomField {
    return {
      label: "Start Date:",
      class: "form-control",
      placeholder: "mm/dd/yyyy",
      maxlength: 10,
      error: "Start Date needs to be entered",
      requiredMsg: "Please enter Start Date",
      regexp: new RegExp('/^\d{2}\/\d{2}\/\d{4}$/')
    }
  }
  get endDate(): ICustomField {
    return {
      label: "End Date:",
      class: "form-control",
      placeholder: "mm/dd/yyyy",
      error: "End Date needs to be entered",
      requiredMsg: "Please enter End Date",
      maxlength: 10,
      regexp: new RegExp('/^\d{2}\/\d{2}\/\d{4}$/')
    }
  }

}

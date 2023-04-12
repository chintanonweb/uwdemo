import { Injectable } from "@angular/core";
import { LabelsService } from '../labels.service';
//import { LabelsService } from "hhsc-ui-lib";

@Injectable()
export class AppLabelsService extends LabelsService {
  constructor() {
    super();
    console.log("AppLabelsService: singleton object has been created ");
  }

  readonly appName = "OIG Portal";

  


  
}

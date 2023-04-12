import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms'
import { AppCustomFieldsService } from '../../core/services/fields/app-custom-fields.service';
import { AppLabelsService } from '../../core/services/labels/app-labels.service';
import { BaseFeatureComponent } from 'src/app/core/components/base-feature/base-feature.component';
import { LoggerService } from 'src/app/core/services/logger.service';
import { CaseDetailsService } from './case-details.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.scss'],
  providers:[CaseDetailsService]
})
export class CaseDetailsComponent extends BaseFeatureComponent implements OnInit {
  dispositionsList = [];
  dateError=false;
  searchDispositionsFlag: boolean = false;
  noDispositionsMsg: string = '';
  errorFlag: boolean = false;
  errorMsg: string = '';
  caseNumber;
  startDate = null;
  endDate = null;
  name;
  columnName='';
  direction;
  sortedTable;
  model: NgbDateStruct;
  formData = this.fb.group({
    startDate:this.defaultFormControl__change,
    endDate:this.defaultFormControl__change,
  });
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public fields: AppCustomFieldsService,
    public labels: AppLabelsService,
    public loggerSrvc: LoggerService,
    private ngxService: NgxUiLoaderService,
    private caseDetailsService:CaseDetailsService
  ) { 
    super();
  }

  ngOnInit() {
    this.caseNumber=this.route.snapshot.paramMap.get('caseNumber');
    //this.name=this.route.snapshot.paramMap.get('name');
    if(this.route.snapshot.paramMap.get('startDate')){
      this.startDate = this.route.snapshot.paramMap.get('startDate')
    }
    if(this.route.snapshot.paramMap.get('endDate')){
      this.endDate = this.route.snapshot.paramMap.get('endDate')
    }
    let input = {
      "input": {
        "caseNumber": this.caseNumber,
        "dateRange": {
          "effBeginDt": this.startDate === null || '' ? this.startDate: this.startDate,
          "effEndDt": this.endDate === null || '' ? this.endDate: this.endDate
        }
        
      }
    };
    this.getDispositions(input);
  }

  search() {
    this.startDate = this.formData.value.startDate, 
    this.endDate = this.formData.value.endDate,
    this.startDate = (this.startDate) ? new Date(this.startDate.month+'-'+this.startDate.day+'-'+this.startDate.year).toISOString() : this.startDate;
    this.endDate = (this.endDate) ? new Date(this.endDate.month+'-'+this.endDate.day+'-'+this.endDate.year).toISOString() : this.endDate;
    
    let payload = {
      "input": {
        "caseNumber": this.caseNumber,
        "dateRange": {
          "effBeginDt": this.startDate === null || '' ? this.startDate: this.startDate,
          "effEndDt": this.endDate === null || '' ? this.endDate: this.endDate
        }
        
      }
    };
    this.getDispositions(payload);
    
    
  }

  getDispositions(payload) {
    this.ngxService.start();
    this.caseDetailsService.getDispositions(payload).subscribe(res => {
      console.log("res");
      this.ngxService.stop();
      this.dispositionsList = res.data.output.edgDispositions;
      if(!this.dispositionsList.length) {
        this.noDispositionsMsg = 'No records found with selected search criteria.'
      }
    }, err => {
      this.ngxService.stop();
      this.errorFlag = true;
      this.errorMsg = err.message;
    });
  }
  
  compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  
  sortBy(event){
    console.log(event)
    let i=event.i;
    let column=event.column
    this.columnName=column;
    this.direction=this.direction === 'asc' ? 'desc':'asc';
    return  this.dispositionsList[i].disposedSegments=this.dispositionsList[i].disposedSegments.sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      return this.direction === 'asc' ? -res : res;
    });
  }

  sortOn(i){
    this.sortedTable=i;
  }

}

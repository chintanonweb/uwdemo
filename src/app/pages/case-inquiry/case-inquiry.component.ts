import { Component, OnInit, Inject } from '@angular/core';
import { CaseInquiryService } from './case-inquiry.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoggerService } from '../../core/services/logger/logger.service';
import { AppCustomFieldsService } from '../../core/services/fields/app-custom-fields.service';
import { AppLabelsService } from '../../core/services/labels/app-labels.service';
import { BaseFeatureComponent } from 'src/app/core/components/base-feature/base-feature.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-case-inquiry',
  templateUrl: './case-inquiry.component.html',
  styleUrls: ['./case-inquiry.component.scss']
})

export class CaseInquiryComponent extends BaseFeatureComponent implements OnInit {
  model: NgbDateStruct;
  formData: FormGroup;
  dateError=false;
  dispositionsList = [];
  noDispositionsMsg: string = '';
  errorFlag: boolean = false;
  errorMsg: string = '';
  columnName='';
  direction;
  sortedTable;
  searchDispositionsFlag: boolean = false;
  caseNumber;
  startDate = null;
  endDate = null;
  name;
  constructor(
    private caseInquiryService: CaseInquiryService,
    private fb: FormBuilder,
    private router: Router,
    private logger: LoggerService,
    private route: ActivatedRoute,
    public fields: AppCustomFieldsService,
    public labels: AppLabelsService,
    private ngxService: NgxUiLoaderService,
  ) { 
    super();
  }

  ngOnInit() {
    this.formData = this.fb.group({
      caseNumber: this.defaultFormControl__change,
      startDate: this.defaultFormControl__change,
      endDate: this.defaultFormControl__change,
    });
    console.log(this.route.snapshot.paramMap.get('caseNumber'))
    

    if(this.caseInquiryService.getSearchResultsData()){
      this.dispositionsList=this.caseInquiryService.getSearchResultsData()
    }

    let searhcData=this.caseInquiryService.getSearchData();
    console.log(searhcData)
    if(searhcData){
      if(searhcData.caseNumber)
        this.formData.get('caseNumber').patchValue(searhcData.caseNumber)
      if(searhcData.effBeginDt)
        this.formData.get('startDate').patchValue(searhcData.effBeginDt)
      if(searhcData.effEndDt)
        this.formData.get('endDate').patchValue(searhcData.effEndDt)
    }

    if (this.route.snapshot.paramMap.get('caseNumber'))
    {
      this.formData.get('caseNumber').patchValue(this.route.snapshot.paramMap.get('caseNumber'));
      this.formData.get('startDate').patchValue('');
      this.formData.get('endDate').patchValue('');
      this.dispositionsList=[];
    }
  }

  search() {
    this.errorFlag = false;
    let startDate = null, endDate=null;
    if(this.formData.value.startDate && this.formData.value.endDate) {
      this.checkDates()
      if(this.checkDates()) {
        return
      }
    }

    if ((this.formData.value.caseNumber && this.formData.controls['caseNumber'].errors && this.formData.controls['caseNumber'].errors['invalidCaseNumberLength'])) {
      return;
    }
    
    if(this.formData.value.startDate) {
      const { day, month, year} = this.formData.value.startDate;
      //startDate = new Date(this.formData.value.startDate.month+'-'+this.formData.value.startDate.day+'-'+this.formData.value.startDate.year).toISOString().split('.')[0];
      startDate = `${year}-${month}-${day}T00:00:00`
   }
   if(this.formData.value.endDate) {
      const { day, month, year} = this.formData.value.endDate;
      endDate = `${year}-${month}-${day}T00:00:00`
      //endDate = new Date(this.formData.value.endDate.month+'-'+this.formData.value.endDate.day+'-'+this.formData.value.endDate.year).toISOString().split('.')[0];
   }
      
    //this.router.navigate(['case-details',this.formData.value.caseNumber, startDate, endDate])
    let input = {
      "input": {
        "caseNumber": this.formData.value.caseNumber,
        "dateRange": {
          "effBeginDt": startDate === null || '' ? startDate: startDate,
          "effEndDt": endDate === null || '' ? endDate: endDate
        }
        
      }
    };
    let searchInput = {
      "caseNumber": this.formData.value.caseNumber,
      "effBeginDt":this.formData.value.startDate,
      "effEndDt":this.formData.value.endDate
    };
    this.caseInquiryService.setSearchData(searchInput);
    this.getDispositions(input);
  } 

  getDispositions(payload) {
    this.dispositionsList = [];
    this.ngxService.start();
    console.log("payload", payload);
    this.caseInquiryService.getDispositions(payload).subscribe(res => {
      console.log("res");
      this.ngxService.stop();
      if(res.data) {
        this.dispositionsList = res.data.output.edgDispositions;
      }
      //this.dispositionsList = res.data.output.edgDispositions;
      this.caseInquiryService.setSearchResultsData(this.dispositionsList)
      if(!this.dispositionsList.length) {
        this.noDispositionsMsg = 'No results found. Please change your search criteria and search again....'
      }
    }, err => {
      this.ngxService.stop();
      this.errorFlag = true;
      this.errorMsg = err.message;
    });
  }

  convertToCTC(date,tzString){
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));
  }
  
  formElemChange($event) {
    this.logger.debug('onChange');
  }

  checkDates(){
    let startDate = new Date(this.formData.value.startDate.month+'-'+this.formData.value.startDate.day+'-'+this.formData.value.startDate.year)
    let endDate = new Date(this.formData.value.endDate.month+'-'+this.formData.value.endDate.day+'-'+this.formData.value.endDate.year)
    
    if (startDate > endDate) {
      this.dateError = true;
      return this.dateError
    }
    else {
      this.dateError = false;
      return this.dateError
    }
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

  generateReport(i){
    let grpayLoad = JSON.parse(JSON.stringify(this.dispositionsList[i]))
    grpayLoad['createDt']= grpayLoad['createDt'] ? grpayLoad['createDt'].replace('.000+0000', '') :null;
    grpayLoad['diActionDt']= grpayLoad['diActionDt']  ? grpayLoad['diActionDt'].replace('.000+0000', '') :null;
    grpayLoad['edbcRunDt']= grpayLoad['edbcRunDt'] ? grpayLoad['edbcRunDt'].replace('.000+0000', '') :null;
    grpayLoad['nextDispositionDt']= grpayLoad['nextDispositionDt'] ? grpayLoad['nextDispositionDt'].replace('.000+0000', '') :null;
    grpayLoad['nextEdbcRunDt']= grpayLoad['nextEdbcRunDt'] ? grpayLoad['nextEdbcRunDt'].replace('.000+0000', '') :null;
    grpayLoad['previousDispositionDt']= grpayLoad['previousDispositionDt'] ? grpayLoad['previousDispositionDt'].replace('.000+0000', '') :null;
    grpayLoad['previousEdbcRunDt']= grpayLoad['previousEdbcRunDt'] ? grpayLoad['previousEdbcRunDt'].replace('.000+0000', '') :null;
    for(let index = 0; index < grpayLoad.disposedSegments.length; index++) {
      grpayLoad.disposedSegments[index]['applicationDt']= grpayLoad.disposedSegments[index]['applicationDt'] ? grpayLoad.disposedSegments[index]['applicationDt'].replace('.000+0000', '') : null;
      grpayLoad.disposedSegments[index]['benefitEndDt']= grpayLoad.disposedSegments[index]['benefitEndDt'] ? grpayLoad.disposedSegments[index]['benefitEndDt'].replace('.000+0000', '') : null;
      grpayLoad.disposedSegments[index]['benefitStartDt']= grpayLoad.disposedSegments[index]['benefitStartDt'] ? grpayLoad.disposedSegments[index]['benefitStartDt'].replace('.000+0000', '') : null;
    }
    this.ngxService.start();
    this.caseInquiryService.downloadPDF(grpayLoad).then(res => {
      this.ngxService.stop();
      res.blob().then(blob => {
        console.log(blob);
        if (blob.type == "application/pdf") {
          //let url = URL.createObjectURL(blob);
          let features = "height=600,width=800,status=yes,toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=yes,alwaysRaised=yes";
          let winId = window.open(URL.createObjectURL(blob), 'list', features);
          winId.focus();
        }
        else {
          this.ngxService.stop();
          this.errorFlag = true;
          //this.errorMsg = res.message;
          this.errorMsg = 'No report found, please search again after sometime.';
        }
      })
    });
  }
  
}

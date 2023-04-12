import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {  faArrowDown, faArrowUp, faSortDown, faSortUp, faSort } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-case-details-table',
  templateUrl: './case-details-table.component.html',
  styleUrls: ['./case-details-table.component.scss']
})
export class CaseDetailsTableComponent implements OnInit {
  @Input() disposedSegments;
  @Input() i;
  @Input() direction;
  @Output() sortByParent:any = new EventEmitter<string>();
  @Input() sortedTable;
  faArrowDown=faSortDown;
  faArrowUp=faSortUp;
  faSort=faSort;
  sortApplied=false;
  columnSelected='';

  
  constructor() { }

  ngOnInit() {
  }

  sortBy(i,column){
    this.sortApplied=true;
    this.columnSelected=column;
    let data={
      i:i,
      column:column
    }
    this.sortByParent.next(data)
  }
  
}

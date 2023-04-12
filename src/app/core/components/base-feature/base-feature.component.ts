import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-base-feature',
  templateUrl: './base-feature.component.html',
  styleUrls: ['./base-feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseFeatureComponent implements OnInit {
  constructor() { }

  @Input() pageId: string; // Page Id
  @Input() componentId: string; // Component Id
  @Input() instanceId: number; // Component Instance Id

  /**
   * 0 = Minimize, 1 = Maximize, Default is 1
   */
  @Input() windowState: number = 1;
  @Input() componentTitle: string;

  ngOnInit() { }

  /**
   * Returns pageId which is given while configuring the feature component on the page
   */
  getPageId() {
    return this.pageId;
  }

  /**
   * Returns component unique id which is a combination of pageId, componentId and instanceId
   *
   * @returns {string}
   * @memberof BaseFeatureComponent
   */
  getComponentUnuqueId(): string {
    return `${this.pageId}_${this.componentId}_${this.instanceId}`;
  }

  /**
   * Returns unique element id for a given id by prepending componentId and instanceId
   *
   * @param {string} id
   * @returns {string}
   * @memberof BaseFeatureComponent
   */
  getId(id: string): string {
    if (this.componentId && this.instanceId) {
      return `${this.componentId}_${this.instanceId}_${id}`;
    }
    return id;
  }

  /**
   * Returns new instance of Default FormControl object
   *
   * @readonly
   * @memberof BaseFeatureComponent
   */
  get defaultFormControl() {
    return new FormControl(null, {
      updateOn: 'blur'
    });
  }


  /**
   * Returns new instance of Default FormControl object
   *
   * @readonly
   * @memberof BaseFeatureComponent
   */
  get defaultFormControl__change() {
    return new FormControl(null, {
      updateOn: 'change'
    });
  }



  /**
   * Returns max date for dob text field which is today
   *
   * @readonly
   * @memberof BaseFeatureComponent
   */
  get dobMaxDate() {
    const d = new Date();
    return {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate()
    };
  }

  /**
   * Returns min date for dob text field which is 01/01/1990
   *
   * @readonly
   * @memberof BaseFeatureComponent
   */
  get dobMinDate() {
    const d = new Date();
    return {
      year: 2009,
      month: 1,
      day: 1
    };
  }

  get todayAsMaxDate() {
    const d = new Date();
    return {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate()
    };
  }

  get minDate() {
    const d = new Date();
    return {
      year: 2009,
      month: 1,
      day: 1
    };
  }

  /**
   * Trims all the fields in object and children
   * https://stackoverflow.com/questions/33510625/trim-white-spaces-in-both-object-key-and-value-recursively
   * @param o:any
   */
  trimWhiteSpaceAroundBoundary(o: any) {
    return JSON.parse(JSON.stringify(o).replace(/"\s+|\s+"/g, '"'));
  }

  /**
   * Returns true if any of the keys in the json has value.
   * @param json
   */
  isFormEmpty(json) {
    let flag = true;
    if (typeof json === 'object') {
      Object.keys(json).forEach(function (key) {
        if (json[key] !== null && json[key] !== '') {
          if (typeof json[key] !== 'object') {
            flag = false;
          } else {
            // 1 level depth
            const j = json[key];
            Object.keys(j).forEach(function (k) {
              if (
                typeof j[k] !== 'object' &&
                json[k] !== null &&
                json[k] !== ''
              ) {
                flag = false;
              }
            });
          }
        }
      });
    }
    console.log('is form empty: ' + flag);
    return flag;
  }
  /**
   * Opens the given URL in new Window with given Window name
   * @param url,
   * @param windowName
   */
  openUrlInNewWindow(url, windowName) {
    window.open(url, windowName, "width=1000,height=1000");
  }

  /**
  * Opens the given PDF in new Window with given Window name
  * @param url,
  * @param windowName
  */
  openPdfInNewWindow(url, windowName) {
    window.open(window.location.origin + url, windowName, "width=1000,height=1000");
  }
}


import { Component, Inject } from '@angular/core';
import { AppService } from './app.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OIG-HistoricalReport';
  //isLogin=false;
  //userActivity;

  //@ViewChild('logoutmodal', { static: false }) private logoutmodal;
  constructor(
    // private app: AppService,
    // private modalService: NgbModal,
    @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth
  ) {
    //this.idleTimeOut();
    // this.app.getUserInactive().subscribe(data => {
    //   if (data) {
    //     this.clearCounter();
    //   }
    //   else {
    //     let ngbModalOptions: NgbModalOptions = {
    //       backdrop: 'static',
    //       keyboard: false
    //     };
    //     this.modalService.open(this.logoutmodal, ngbModalOptions);
    //   }
    // });
  }
  ngOnInit() {

  }
  public async signOut(): Promise<void> {
    await this._oktaAuth.signOut();
  }

  // continue(status) {
  //   this.modalService.dismissAll()
  //   if (!status) {
  //     //this.isLogin=false;
  //   }
  //   else {
  //     this.app.makeUserActive().subscribe(res => {
  //       console.log(res);
  //     }, err => {
  //       console.log("Error");
  //     });;
  //   }
  // }

  // idleTimeOut() {
  //   this.userActivity = setTimeout(() => this.app.setUserInactive(), environment.idleTimeOutDuration);
  // }

  // clearCounter() {
  //   clearTimeout(this.userActivity);
  //   this.idleTimeOut();
  // }
}

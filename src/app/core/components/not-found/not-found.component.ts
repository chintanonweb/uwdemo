import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private location: Location, private router: Router) {}

  ngOnInit() {}

  goHome() {
    this.router.navigateByUrl('/home');
  }

  goBack() {
    this.location.back();
    return false;
  }

}

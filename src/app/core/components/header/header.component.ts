import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: any;
  name: Observable<string>;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private _oktaAuthStateService: OktaAuthStateService, @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth) { }

  async ngOnInit() {
    this.name = this._oktaAuthStateService.authState$.pipe(
      filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
      map((authState: AuthState) => authState.idToken.claims ? authState.idToken.claims.name : '')
    );

    // this.user = await this._oktaAuth.getUser();
    // this.name = this.user.name;

  }

  getDate(): Date {
    return new Date();
  }

  public async signOut(): Promise<void> {
    await this._oktaAuth.signOut();
    //location.reload()
  }

}

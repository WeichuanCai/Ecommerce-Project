import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuth } from '@okta/okta-auth-js';
import { OktaAuthStateService } from '@okta/okta-angular';
import { OKTA_AUTH } from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: string;
  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth,private oktaAuthService: OktaAuthStateService,) { }

  ngOnInit(): void {
    this.oktaAuthService.authState$.subscribe(

      (result) => {

        this.isAuthenticated = result.isAuthenticated;

        this.getUserDetails();

      }

    );
  }
  getUserDetails() {
    if (this.isAuthenticated) {



      // Fetch the logged in user details (user's claims)

      //

      // user full name is exposed as a property name

      this.oktaAuth.getUser().then(

        (res) => {

          this.userFullName = res.name;

        }

      );
  }
}

logout() {

  // Terminates the session with Okta and removes current tokens.

  this.oktaAuth.signOut();

}

}

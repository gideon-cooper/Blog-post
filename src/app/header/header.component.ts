import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authListenserSubs: Subscription;
  userIsAuthenticated = false;
  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }
  ngOnInit() {
    this.authListenserSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  ngOnDestroy() {
    this.authListenserSubs.unsubscribe();
  }
}

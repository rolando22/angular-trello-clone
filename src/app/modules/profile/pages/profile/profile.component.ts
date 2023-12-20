import { Component, OnInit } from '@angular/core';

import { AuthService } from '@services/auth.service';
import { User } from '@models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  user: User | null = null;

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.user$
      .subscribe(user => this.user = user);
  }

}

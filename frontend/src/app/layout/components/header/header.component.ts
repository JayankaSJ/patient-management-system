import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Router } from '@angular/router';
import { IdentityService } from '../../../services/identity.service';

@Component({
  selector: 'app-header',
  imports: [NzLayoutModule, NzIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private identityService: IdentityService
  ) {}

  logout() {
    this.identityService.logout();

    this.router.navigate(['/login']);
  }
}

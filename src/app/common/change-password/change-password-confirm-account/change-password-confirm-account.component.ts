import { Component } from '@angular/core';
import { Hearder1Component } from '../../headers/hearder-1/hearder-1.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-change-password-confirm-account',
  standalone: true,
  imports: [Hearder1Component, RouterModule],
  templateUrl: './change-password-confirm-account.component.html',
  styleUrl: './change-password-confirm-account.component.css'
})
export class ChangePasswordConfirmAccountComponent {

}

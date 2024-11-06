import { Component } from '@angular/core';
import { Hearder1Component } from '../headers/hearder-1/hearder-1.component';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [Hearder1Component],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

}

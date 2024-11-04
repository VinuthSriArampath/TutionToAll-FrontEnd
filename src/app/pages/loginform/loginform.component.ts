import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loginform',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './loginform.component.html',
  styleUrl: './loginform.component.css'
})
export class LoginformComponent {
  private router: Router;
  public username:String = "";
  public password:String = "";
  constructor(router: Router) {
    this.router = router;
  }
  login(){
    console.log();
    
    swal.fire({
      title: "Login Successful!",
      text: `Welcome ${this.username}`,
      icon: "success",
      confirmButtonText: "Continue"
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/institute/register']);
      }
    });
  }
}

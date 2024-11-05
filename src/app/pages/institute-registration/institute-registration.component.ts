import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-institute-registration',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './institute-registration.component.html',
  styleUrl: './institute-registration.component.css'
})
export class InstituteRegistrationComponent {
  public institute:any={
      instituteName:"",
      contactNo:"",
      emailAddress:"",
      address:"",
      loginPassword:"",
      confirmPassword:"",
  }
  private router;
  public OTP:String="000";
  constructor(router:Router){
    this.router=router
  }
  validateDetails():boolean{
    const contactPattern=/^0[0-9]{9}$/;
    const emailPattern=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if(this.institute.instituteName==""){
      this.alertMessage("Institute Name is Required","error");
      return false;
    }else if(!contactPattern.test(this.institute.contactNo)){
      this.alertMessage("Contact Number is Invalid","error");
      return false;
    }else if(!emailPattern.test(this.institute.emailAddress)){
      this.alertMessage("Email Address is Invalid","error");
      return false;
    }else if(this.institute.address==""){
      this.alertMessage("Address is Required","error");
    }else if(!passwordPattern.test(this.institute.loginPassword)){
      this.alertMessage("Password is Invalid","error"); 
      return false;
    }else{
      if(this.institute.loginPassword!=this.institute.confirmPassword){
        this.alertMessage("Password and Confirm Password are not matched","error");
        return false;
      }else{
        return true;
      }
    }
    return false;
  }
  registrationNextStep(){
    if(this.validateDetails()){
      console.log(this.institute);
      this.alertMessage("Otp Has Been Sent To Your Email Address","info");
      this.router.navigate(['/institute/registration/otp']);
    }
  }
  public alertMessage(title:String,icon:any){
    swal.fire({
      title:title,
      icon:icon,
      denyButtonText:"OK",
    })
  }
  public registrationCancel(){
    this.router.navigate(['']);
  }
}

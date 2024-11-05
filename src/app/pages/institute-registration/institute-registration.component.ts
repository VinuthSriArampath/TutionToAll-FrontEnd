import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-institute-registration',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './institute-registration.component.html',
  styleUrl: './institute-registration.component.css'
})
export class InstituteRegistrationComponent {
  public static OTP: any;
  
  public institute:any={
    name:"",
    email:"",
    contact: '',
    address: '',
    password: '',
  };
  public confirmPassword:String="";
  constructor(private router:Router, private http:HttpClient) {}

  validateDetails():boolean{
    const contactPattern=/^0[0-9]{9}$/;
    const emailPattern=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if(this.institute.name==""){
      this.alertMessage("Institute Name is Required","error");
      return false;
    }else if(!contactPattern.test(this.institute.contact)){
      this.alertMessage("Contact Number is Invalid","error");
      return false;
    }else if(!emailPattern.test(this.institute.email)){
      this.alertMessage("Email Address is Invalid","error");
      return false;
    }else if(this.institute.address==""){
      this.alertMessage("Address is Required","error");
    }else if(!passwordPattern.test(this.institute.password)){
      this.alertMessage("Password is Invalid","error"); 
      return false;
    }else{
      if(this.institute.password!=this.confirmPassword){
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
      try{
        this.http.get(`http://localhost:8080/institutes/otp/${this.institute.email}`).subscribe(data => {
          InstituteRegistrationComponent.OTP = data;
        });
        localStorage.setItem('instituteData', JSON.stringify(this.institute));
        this.alertMessage("Otp Has Been Sent To Your Email Address","info");
        this.router.navigate(['/institute/registration/otp']);
      }catch(error){
        this.alertMessage("Something Went Wrong","error");
        return;
      }
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

  public static getOTP(): any {
    return InstituteRegistrationComponent.OTP;
  }
}

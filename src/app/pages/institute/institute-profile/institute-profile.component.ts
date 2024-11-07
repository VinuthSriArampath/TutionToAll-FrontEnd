import { Component } from '@angular/core';
import { InstituteNavbarComponent } from "../common/institute-navbar/institute-navbar.component";
import { FooterComponent } from "../../../common/footer/footer.component";
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import swal from 'sweetalert2';
import { log } from 'console';

@Component({
  selector: 'app-institute-profile',
  standalone: true,
  imports: [InstituteNavbarComponent, FooterComponent,RouterLink,CommonModule,FormsModule],
  templateUrl: './institute-profile.component.html',
  styleUrl: './institute-profile.component.css'
})
export class InstituteProfileComponent {
  public isEdit:boolean = false;
  public institute:any = {
    id:'',
    name:'',
    email:'',
    contact:'',
    address:'',
    password:''
  };
  private instituteId:string = '';
  constructor(private http:HttpClient){
    const LoggedUser = JSON.parse(sessionStorage.getItem('LoggedUser') || '');
    this.http.get(`http://localhost:8080/institutes/search/${LoggedUser.id}`).subscribe((res:any)=>{
        this.institute = res;
    })
  }
  editSwitch(){
    this.isEdit = true; 
  }
  update(){
    if(this.validateInstitute()){
      console.log(this.institute);
      this.http.patch(`http://localhost:8080/institutes/update`,this.institute).subscribe((res:any)=>{
        this.alertMessage("Institute Details Updated Successfully","success");
        this.isEdit = false;
      });
    }
  }

  cancel(){
    this.isEdit = false;
  }
  clearData(){
    this.isEdit = false;
  }
  validateInstitute():boolean{
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
    }
    // else if(!passwordPattern.test(this.institute.password)){
    //   this.alertMessage("Password is Invalid","error"); 
    //   return false;
    // }
    return true;
  }
  public alertMessage(title:String,icon:any){
    swal.fire({
      title:title,
      icon:icon,
      denyButtonText:"OK",
    })
  }  
}

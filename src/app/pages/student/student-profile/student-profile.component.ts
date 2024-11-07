import { Component } from '@angular/core';
import { StudentNavbarComponent } from "../common/student-navbar/student-navbar.component";
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../../common/footer/footer.component";

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [StudentNavbarComponent, FormsModule, CommonModule, FooterComponent],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css'
})
export class StudentProfileComponent {
  public isEdit:boolean = false;
  public student:any = {
    id:'',
    firstName:'',
    lastName:'',
    dob:'',
    contact:'',
    email:'',
    address:'',
    password:''
  };
  private studentId:string = '';
  constructor(private http:HttpClient){
    const LoggedUser = JSON.parse(sessionStorage.getItem('LoggedUser') || '');
    this.http.get(`http://localhost:8080/students/search/${LoggedUser.id}`).subscribe((res:any)=>{
        this.student = res;
    })
  }
  editSwitch(){
    this.isEdit = true; 
  }
  update(){
    if(this.validateStudent()){
      this.http.patch(`http://localhost:8080/students/update`,this.student).subscribe((res:any)=>{
        this.alertMessage("student Details Updated Successfully","success");
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
  validateStudent():boolean{
    const contactPattern=/^0[0-9]{9}$/;
    const emailPattern=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if(this.student.name==""){
      this.alertMessage("student Name is Required","error");
      return false;
    }else if(!contactPattern.test(this.student.contact)){
      this.alertMessage("Contact Number is Invalid","error");
      return false;
    }else if(!emailPattern.test(this.student.email)){
      this.alertMessage("Email Address is Invalid","error");
      return false;
    }else if(this.student.address==""){
      this.alertMessage("Address is Required","error");
    }
    // else if(!passwordPattern.test(this.student.password)){
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

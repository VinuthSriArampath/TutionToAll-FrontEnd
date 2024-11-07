import { Component } from '@angular/core';
import { FooterComponent } from "../../../common/footer/footer.component";
import { TeacherNavbarComponent } from "../common/teacher-navbar/teacher-navbar.component";
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-teacher-profile',
  standalone: true,
  imports: [FooterComponent, TeacherNavbarComponent,FormsModule,CommonModule],
  templateUrl: './teacher-profile.component.html',
  styleUrl: './teacher-profile.component.css'
})
export class TeacherProfileComponent {
  public isEdit:boolean = false;
  public teacher:any = {
    id:'',
    firstName:'',
    lastName:'',
    dob:'',
    contact:'',
    email:'',
    address:'',
    password:''
  };
  private teacherId:string = '';
  constructor(private http:HttpClient){
    const LoggedUser = JSON.parse(sessionStorage.getItem('LoggedUser') || '');
    this.http.get(`http://localhost:8080/teachers/search/${LoggedUser.id}`).subscribe((res:any)=>{
        this.teacher = res;
    })
  }
  editSwitch(){
    this.isEdit = true; 
  }
  update(){
    if(this.validateteacher()){
      this.http.patch(`http://localhost:8080/teachers/update`,this.teacher).subscribe((res:any)=>{
        this.alertMessage("teacher Details Updated Successfully","success");
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
  validateteacher():boolean{
    const contactPattern=/^0[0-9]{9}$/;
    const emailPattern=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if(this.teacher.name==""){
      this.alertMessage("teacher Name is Required","error");
      return false;
    }else if(!contactPattern.test(this.teacher.contact)){
      this.alertMessage("Contact Number is Invalid","error");
      return false;
    }else if(!emailPattern.test(this.teacher.email)){
      this.alertMessage("Email Address is Invalid","error");
      return false;
    }else if(this.teacher.address==""){
      this.alertMessage("Address is Required","error");
    }
    // else if(!passwordPattern.test(this.teacher.password)){
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

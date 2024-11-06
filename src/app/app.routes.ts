import { Routes } from '@angular/router';
import { LoginformComponent } from './common/loginform/loginform.component';
import { InstituteRegistrationComponent } from './pages/institute/institute-registration/institute-registration.component';
import { InstituteRegistrationOtpComponent } from './pages/institute/institute-registration-otp/institute-registration-otp.component';
import { ChangePasswordComponent } from './common/change-password/change-password.component';
import { StudentDashboardComponent } from './pages/student/student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './pages/teacher/teacher-dashboard/teacher-dashboard.component';
import { InstituteDashboardComponent } from './pages/institute/institute-dashboard/institute-dashboard.component';
import { InstituteAddCourseComponent } from './pages/course/institute-add-course/institute-add-course.component';
import { InstituteRegisterTeacherComponent } from './pages/teacher/institute-register-teacher/institute-register-teacher.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginformComponent
    },
    {
        path: 'institute/register',
        component: InstituteRegistrationComponent  
    },
    {
        path: 'institute/registration/otp',
        component: InstituteRegistrationOtpComponent  
    },
    {
        path: 'change-password',
        component: ChangePasswordComponent 
    },
    {
        path:'student/dashboard',
        component: StudentDashboardComponent
    },
    {
        path:'teacher/dashboard',
        component: TeacherDashboardComponent
    },
    {
        path:'institute/dashboard',
        component: InstituteDashboardComponent
    },
    {
        path:'institute/course/add-course',
        component: InstituteAddCourseComponent
    },
    {
        path:'institute/teacher/add-teacher',
        component: InstituteRegisterTeacherComponent
    }
];

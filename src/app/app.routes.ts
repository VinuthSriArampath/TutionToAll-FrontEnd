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
import { InstituteRegisterStudentComponent } from './pages/student/institute-register-student/institute-register-student.component';
import { InstituteProfileComponent } from './pages/institute/institute-profile/institute-profile.component';
import { StudentProfileComponent } from './pages/student/student-profile/student-profile.component';
import { TeacherProfileComponent } from './pages/teacher/teacher-profile/teacher-profile.component';
import { ManageCourseComponent } from './pages/course/manage-course/manage-course.component';
import { UpdateCourseComponent } from './pages/course/update-course/update-course.component';

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
    },
    {
        path:'institute/student/add-student',
        component: InstituteRegisterStudentComponent
    },
    {
        path:'institute/profile',
        component: InstituteProfileComponent
    },
    {
        path:'student/profile',
        component: StudentProfileComponent
    },
    {
        path:'teacher/profile',
        component: TeacherProfileComponent
    },
    {
        path:'institute/course/manage',
        component: ManageCourseComponent 
    },
    {
        path:'institute/course/update',
        component: UpdateCourseComponent
    }
];

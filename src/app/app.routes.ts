import { Routes } from '@angular/router';
import { LoginformComponent } from './common/loginform/loginform.component';
import { InstituteRegistrationComponent } from './pages/institute/institute-registration/institute-registration.component';
import { InstituteRegistrationOtpComponent } from './pages/institute/institute-registration-otp/institute-registration-otp.component';
import { ChangePasswordComponent } from './common/change-password/change-password.component';

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
    }
];

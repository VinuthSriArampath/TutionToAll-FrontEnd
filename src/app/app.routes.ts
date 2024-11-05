import { Routes } from '@angular/router';
import { LoginformComponent } from './pages/loginform/loginform.component';
import { InstituteRegistrationComponent } from './pages/institute-registration/institute-registration.component';
import { InstituteRegistrationOtpComponent } from './pages/institute-registration-otp/institute-registration-otp.component';

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
];

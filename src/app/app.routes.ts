import { Routes } from '@angular/router';
import { LoginformComponent } from './pages/loginform/loginform.component';
import { InstituteRegistrationComponent } from './pages/institute-registration/institute-registration.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginformComponent
    },
    {
        path: 'institute/register',
        component: InstituteRegistrationComponent  
    }
];

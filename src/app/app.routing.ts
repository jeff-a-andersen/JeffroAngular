import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { ProfileComponent } from './user/profile/profile.component';
import { AuthGuard } from './_guards';
import { SettingComponent } from './user/setting/setting.component';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { UserListComponent } from './admin/user-list/user-list.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'setting', component: SettingComponent, canActivate: [AuthGuard] },
    { path: 'admin/user', component: UserListComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);

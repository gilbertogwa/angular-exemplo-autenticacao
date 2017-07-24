import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from "./auth.guard";


const APP_ROUTES_CONFIG: Routes = [
{
    path: '',
    component: AppComponent,
    children : [
      {
        path: '', redirectTo: 'login', pathMatch: 'full'
      },
      {
        path: 'home', component: HomeComponent
        , canActivate: [AuthGuard]
      },
      {
        path: 'login', component: LoginComponent
      }
    ]
}];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES_CONFIG, { useHash: true });

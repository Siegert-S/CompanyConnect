import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CompanysComponent } from './features/companys/companys.component';

export const routes: Routes = [
    {path: '' , component: LandingPageComponent, },
    {path: 'home' , component: MainLayoutComponent, 
        children:[
            {path: '', component: DashboardComponent},
            {path: 'dashboard', component: DashboardComponent},
            {path: 'companys', component: CompanysComponent}
        ]
    }
];

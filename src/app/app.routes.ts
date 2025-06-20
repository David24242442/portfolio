import { Routes } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';

export const routes: Routes = [
{path: "", component: LandingpageComponent},
{path: "about", component: LandingpageComponent},
{path: "experience", component: LandingpageComponent},
{path: "projects", component: LandingpageComponent},
{path: "contacts", component: LandingpageComponent}
];

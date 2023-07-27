import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";


const appRoute: Routes = [
    { path: '', redirectTo: 'home', pathMatch: "full" },
    { path: 'home',component: HomeComponent },

   
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute)
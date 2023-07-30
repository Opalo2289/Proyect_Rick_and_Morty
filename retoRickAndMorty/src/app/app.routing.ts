import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./components/views/home-page/home-page.component";
import { CharacterComponent } from "./components/views/characters/character/character.component";
import { EpisodeComponent } from "./components/views/episodes/episode/episode.component";
import { LocationComponent } from "./components/views/locations/location/location.component";
import { SingleCharacterComponent } from "./components/views/single-character/single-character.component";


const appRoute: Routes = [
    { path: '', redirectTo: 'home', pathMatch: "full" },
    { path: 'home',component: HomePageComponent },
    {path: 'home', children: [
        { path: 'character',component: CharacterComponent },
        { path: 'character/:id',component: SingleCharacterComponent },

        { path: 'episodes',component: EpisodeComponent },
        { path: 'episodes/:id',component: SingleCharacterComponent },

        { path: 'location',component: LocationComponent },
        { path: 'location/:id',component: SingleCharacterComponent },
       
    ]},

   

   
];




export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute)
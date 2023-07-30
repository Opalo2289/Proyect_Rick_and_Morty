import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./components/views/home-page/home-page.component";
import { CharacterComponent } from "./components/views/characters/character/character.component";
import { EpisodeComponent } from "./components/views/episodes/episode/episode.component";
import { LocationComponent } from "./components/views/locations/location/location.component";
import { SingleCharacterComponent } from "./components/views/single-character/single-character.component";
import { SingleEpisodeComponent } from "./components/views/single-espisodios/single-espisodios.component";
import { SingleLocationComponent } from "./components/views/single-location/single-location.component";


const appRoute: Routes = [
    { path: '', redirectTo: 'home', pathMatch: "full" },
    { path: 'home',component: HomePageComponent },
    {path: 'home', children: [
        { path: 'characters',component: CharacterComponent },
        { path: 'characters/:id',component: SingleCharacterComponent },

        { path: 'episodes',component: EpisodeComponent },
        { path: 'episodes/:id',component: SingleEpisodeComponent},

        { path: 'locations',component: LocationComponent },
        { path: 'locations/:id',component: SingleLocationComponent },
       
    ]},

   

   
];




export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute)
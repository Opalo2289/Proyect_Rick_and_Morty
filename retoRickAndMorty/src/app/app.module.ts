import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { BodyComponent } from './components/body/body.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { CharacterComponent } from './components/views/characters/character/character.component';
import { LocationComponent } from './components/views/locations/location/location.component';
import { EpisodeComponent } from './components/views/episodes/episode/episode.component';
import { HomePageComponent } from './components/views/home-page/home-page.component';
import { HeaderComponent } from './components/headers/header/header.component'; 


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    BodyComponent,
    ArticulosComponent,
    CharacterComponent,
    LocationComponent,
    EpisodeComponent,
    HomePageComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    routing,
    NgbModule,
    NgbPaginationModule,
    NgxPaginationModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }

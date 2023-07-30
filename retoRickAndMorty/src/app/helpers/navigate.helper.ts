import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationHelper {

  constructor(private router: Router) { }

  getItemId(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

  navigateToEpisode(episodeUrl: string) {
    this.router.navigate(['home/episodes/', this.getItemId(episodeUrl)]);
  }

  navigateToLocation(locationUrl: string) {
    this.router.navigate(['home/locations/', this.getItemId(locationUrl)]);
  }

  navigateToCharacter(characterUrl: string) {

    this.router.navigate(['home/characters/', this.getItemId(characterUrl)]);
  }
}
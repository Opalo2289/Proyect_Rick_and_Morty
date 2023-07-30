import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationHelper } from 'src/app/helpers/navigate.helper';
import { Character } from 'src/app/interfaces/basedata.interface';
import { ApiCharacterService } from 'src/app/services/api-character.service';
declare var iziToast: any

@Component({
  selector: 'app-single-character',
  templateUrl: './single-character.component.html',
  styleUrls: ['./single-character.component.css']
})


export class SingleCharacterComponent {
  public characterId: string = ''; // Aquí almacenaremos el ID del personaje
  public character: Character | undefined;
  
  constructor(
    private _serviceCharacter: ApiCharacterService,
    private route: ActivatedRoute,
    private navigationHelper: NavigationHelper
  ) {}

  ngOnInit(): void {
    // Usamos el servicio ActivatedRoute para obtener el valor del parámetro :id
    this.route.paramMap.subscribe(params => {
      this.characterId = params.get('id') ?? ''; // Asignar un valor predeterminado ('') si params.get('id') es null
      console.log('ID del personaje:', this.characterId);
      // Resto del código que utilice this.characterId
    });

    this.getCharacter()
  }

  getCharacter(){
    this._serviceCharacter.getId(this.characterId).subscribe({
      next: (response: Character) => {
          this.character = response;
          console.log("response", this.character)
          console.log("response", this.character.name)
        },
      error: (error: any)=> {
        iziToast.show({
          title: 'ERROR',
          titleColor: '#812',
          color: 'red',
          class: 'test-danger',
          position: 'topRight',
          message: 'NO SE ENCONTRARON COINCIDENCIAS',
          messageSize: 'large',
        });
        }
      });
  }

  // getEpisodeId(episodeUrl: string): string {
  //   const parts = episodeUrl.split('/');
  //   return parts[parts.length - 1];
  // }

  // navigateToEpisode(episodeUrl: string) {

  //   this._router.navigate(['home/episodes/', this.getEpisodeId(episodeUrl)]);
  // }


  getItemId(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

  navigateToEpisode(episodeUrl: string) {
    this.navigationHelper.navigateToEpisode(episodeUrl);
  }

  navigateToLocation(locationUrl: string) {
    this.navigationHelper.navigateToLocation(locationUrl);
  }

}

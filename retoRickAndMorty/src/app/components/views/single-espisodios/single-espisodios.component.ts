import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationHelper } from 'src/app/helpers/navigate.helper';
import { Episode } from 'src/app/interfaces/basedata.interface';
import { ApiEpisodeService } from 'src/app/services/api-episode.service';
declare var iziToast: any

@Component({
  selector: 'app-single-espisodios',
  templateUrl: './single-espisodios.component.html',
  styleUrls: ['./single-espisodios.component.css']
})



export class SingleEpisodeComponent {
  public episodeId: string = ''; // Aquí almacenaremos el ID del personaje
  public episode: Episode | undefined;
  
  constructor(
    private _serviceEpisode: ApiEpisodeService,
    private route: ActivatedRoute,
    private navigationHelper: NavigationHelper
  ) {}

  ngOnInit(): void {
    // Usamos el servicio ActivatedRoute para obtener el valor del parámetro :id
    this.route.paramMap.subscribe(params => {
      this.episodeId = params.get('id') ?? ''; // Asignar un valor predeterminado ('') si params.get('id') es null
      console.log('ID del personaje:', this.episodeId);
      // Resto del código que utilice this.characterId
    });

    this.getEpisode()
  }

  getEpisode(){
    this._serviceEpisode.getId(this.episodeId).subscribe({
      next: (response: Episode) => {
          this.episode = response;
          console.log("response", this.episode)
          console.log("response", this.episode.name)
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

  getItemId(characterUrl: string): string {
    return this.navigationHelper.getItemId(characterUrl);
  }

  navigateToCharacter(characterUrl: string) {

    this.navigationHelper.navigateToCharacter(characterUrl);
  }

}

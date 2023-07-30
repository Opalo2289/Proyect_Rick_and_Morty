import { Component, HostListener, inject } from '@angular/core';
import { Episode } from 'src/app/interfaces/basedata.interface';
import { Filter } from 'src/app/interfaces/filters.interface';
import { ApiResponse } from 'src/app/interfaces/apiResponse.interface';
import { ApiError } from 'src/app/interfaces/api.error.interface';
import { ApiEpisodeService } from 'src/app/services/api-episode.service';
declare var iziToast: any


@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css']
})

export class EpisodeComponent {

  public episodes: Episode[] = [];
  public prevEpisodes: Episode[] = [];
  public document: any;
  public currentPage = 1;
  public filters: Filter = {
    name: '',
    status: ''
  };
  public scroll: boolean = true

  constructor(private apiEpisodeService: ApiEpisodeService ) { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    // console.log('hey')
    const { innerHeight } = window;
    
    const { scrollHeight, scrollTop } = document.documentElement;

    if (innerHeight + scrollTop >= scrollHeight && this.scroll) {
      console.log("Entró", this.scroll)
      // El usuario ha llegado al final de la página, cargar más episodios
      this.loadEpisodes();
    }
  }

  ngOnInit() {

    this.fetchData();
  }

  getEpisode(){
    this.apiEpisodeService.getId("1").subscribe({
      next: (response) => {
          console.log("response", response)
        },
      error: (error: any)=> {

        }
      }
      );
  }

  loadEpisodes() {
    this.currentPage++;
    this.fetchData();
  }

  fetchData(){
    this.apiEpisodeService.getData(this.currentPage, this.filters)
    .subscribe({
      next: (response: ApiResponse<Episode>) => {
          console.log(this.currentPage)
          // The API response contains the episodes in the "results" property
          this.episodes.push(...response.results);
          this.prevEpisodes = this.episodes;
          console.log(this.episodes)
        },
      error: (error: ApiError)=> {
          // Here you can handle the error, such as showing an error message in the interface
          this.scroll = false;
          // Lógica para manejar el error
          console.error('Error:', error.message);
          console.error('Código de estado:', error.status);
          console.error('Mensaje de estado:', error.statusText);

          if (error.status == 404){
            iziToast.show({
              title: 'FIN',
              titleColor: '#812',
              color: 'red',
              class: 'test-danger',
              position: 'topRight',
              message: 'NO HAY MAS EPISODIOS',
              messageSize: 'large',
            });
          }
        }
      }
      );
  }


  searchEpisodes(searchText: string) {
    this.episodes = this.prevEpisodes.filter(
      (episode) => episode.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }

}


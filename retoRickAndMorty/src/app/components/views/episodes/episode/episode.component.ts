import { Component, HostListener, inject } from '@angular/core';
import { Episode } from 'src/app/interfaces/basedata.interface';
import { ApiEpisodeService } from 'src/app/services/api-episode.service';
import { Filter } from 'src/app/interfaces/filters.interface';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css']
})

export class EpisodeComponent {

  public episodes: Episode[] = [];
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

  loadEpisodes() {
    this.currentPage++;
    this.fetchData();
  }

  fetchData(){
    this.apiEpisodeService.getData(this.currentPage, this.filters)
    .subscribe({
      next: (response) => {
          console.log(this.currentPage)
          // The API response contains the episodes in the "results" property
          this.episodes.push(...response.results);
          
          console.log(this.episodes)
        },
      error: (error: any)=> {
          // Here you can handle the error, such as showing an error message in the interface
          this.scroll = false;
          console.error('Error in the request:', error);
        }
      }
      );
  }

}
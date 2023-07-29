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
  

  constructor(private apiEpisodeService: ApiEpisodeService ) { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    console.log('hey')
    const { innerHeight } = window;
    
    const { scrollHeight, scrollTop } = document.documentElement;
    console.log()

    if (innerHeight + scrollTop >= scrollHeight) {
      // El usuario ha llegado al final de la página, cargar más episodios
      this.loadEpisodes();
    }
  }

  ngOnInit() {
    this.loadEpisodes();
  }

  loadEpisodes() {
    const pages = 1
    const name = ""
    const prev = ""
    this.apiEpisodeService.getData(prev, name, pages, this.currentPage)
      .subscribe((response) => {
        console.log(pages)
        // The API response contains the episodes in the "results" property
        this.episodes.push(...response.results);
        this.currentPage++;
        console.log(this.episodes)
      });
  }

}

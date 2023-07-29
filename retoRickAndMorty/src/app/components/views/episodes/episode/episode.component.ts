import { Component } from '@angular/core';
import { Episode } from 'src/app/interfaces/basedata.interface';
import { ApiEpisodeService } from 'src/app/services/api-episode.service';
import { Filter } from 'src/app/interfaces/filters.interface';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css']
})
export class EpisodeComponent {

  episodes: Episode[] = [];
  currentPage = 1;
 

  constructor(private apiEpisodeService: ApiEpisodeService) { }

  

  ngOnInit() {
    this.loadEpisodes();
  }

  loadEpisodes() {
    const pages = 1
    const name = ""
    const prev = ""
    this.apiEpisodeService.getData(prev, name, pages)
      .subscribe((response) => {
        // The API response contains the episodes in the "results" property
        this.episodes = response.results;
        
      });
  }





}

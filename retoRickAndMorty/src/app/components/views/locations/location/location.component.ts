import { Component } from '@angular/core';

import { HostListener, inject } from '@angular/core';
import { Location } from 'src/app/interfaces/basedata.interface';
import { ApiEpisodeService } from 'src/app/services/api-episode.service';
import { Filter } from 'src/app/interfaces/filters.interface';
import { DOCUMENT } from '@angular/common';
import { ApiLocationService } from 'src/app/services/api-location.service';

declare var iziToast: any

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent {


    public location: Location[] = [];
    public document: any;
    public currentPage = 1;
    public filters: Filter = {
      name: '',
      status: ''
    };
    public scroll: boolean = true
  
    constructor(private _locationService: ApiLocationService) { }
  
    @HostListener('window:scroll', ['$event'])
    onWindowScroll(): void {
      // console.log('hey')
      const { innerHeight } = window;
      
      const { scrollHeight, scrollTop } = document.documentElement;
  
      if (innerHeight + scrollTop >= scrollHeight && this.scroll) {
        console.log("Entró", this.scroll)
        // El usuario ha llegado al final de la página, cargar más episodios
        this.loadLocation();
      }
    }
  
    ngOnInit() {
      this.fetchData();
    }
  
    loadLocation() {
      this.currentPage++;
      this.fetchData();
    }
  
    fetchData(){
      this._locationService.getData(this.currentPage, this.filters)
      .subscribe({
        next: (response) => {
            console.log(this.currentPage)
            // The API response contains the episodes in the "results" property
            this.location.push(...response.results);
            
            console.log(this.location)
          },
        error: (error: any)=> {
            // Here you can handle the error, such as showing an error message in the interface
            this.scroll = false;
            iziToast.show({
              title: 'FIN',
              titleColor: '#812',
              color: 'red',
              class: 'test-danger',
              position: 'topRight',
              message: 'NO HAY MAS LUGARES',
              messageSize: 'large',
            });
          }
        }
        );
    }
  
  }


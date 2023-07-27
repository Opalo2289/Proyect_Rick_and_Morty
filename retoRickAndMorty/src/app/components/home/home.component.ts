import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';


declare var iziToast: any


// Interfaces para tipar los datos recibidos y las opciones de filtrado
interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface Location {
  name: string;
  url: string;
}

interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  public data : any[]= [];
  public page = 1
  public pageSize = 20
  public count: any
  public filters: { name: string; status: string} = {
    name: '',
    status: ''
  }

  public selectNames: any = []
  public selectStatus: any = []
  public load_data: any = true;

  public filterSize: any = [5, 10, 15, 20]
  // public openSize: any = 20
  public selectedPageSize = 20;

  constructor(private _apiService: ApiService) {}

  ngOnInit(): void {
    this.completeData()
  }

  getSelectParams(){

    const uniqueNamesSet = new Set<string>();
    const uniqueStatusSet = new Set<string>();
    console.log("data:", this.data)
    //Tarea del backend
    this.data.forEach((element) => {
      uniqueNamesSet.add(element.name);
      uniqueStatusSet.add(element.status)
    });

    this.selectNames = Array.from(uniqueNamesSet)
    this.selectStatus = Array.from(uniqueStatusSet)

    console.log(this.selectNames)
    
  }


  applyFilter(){
    this.completeData()
  }
  

  completeData(page: any = 1) {
    this.page = page;
    // console.log(page)
    this._apiService.getData(page, this.filters).subscribe(
      response => {
        console.log(this.page)
        this.count = response.info.count
        this.data = response.results;
        this.getSelectParams()
        setTimeout(() => {
          this.load_data = false
        },3000)
        
      },
      error => {
        iziToast.show({
          title: 'ERROR',
          titleColor: '#812',
          color: 'red',
          class: 'test-danger',
          position: 'topRight',
          message: 'NO SE ENCONTRARON COINCIDENCIAS',
          messageSize: 'large'
        });
        console.log(error.error.error)
      }
    );
  };

  

  deleteFilter() {
    this.filters = {name: '', status: ''}
    this.completeData()
  }

  pageSizeEvent(event: any) {
    this.selectedPageSize = event.target.value
    this.completeData(); // Vuelve a cargar los datos con el nuevo tamaño de página seleccionado
  }


}

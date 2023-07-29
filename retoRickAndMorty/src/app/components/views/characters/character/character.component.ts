import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/interfaces/apiResponse.interface';
import { Character } from 'src/app/interfaces/basedata.interface';
import { Filter } from 'src/app/interfaces/filters.interface';
import { ApiServiceCharacter } from 'src/app/services/api-character.service';

declare var iziToast: any

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent {

  public data : Character[]= [];
  public page = 1
  public count: number | undefined;
  public filters: Filter = {
    name: '',
    status: ''
  };

  public selectNames: string[] = [];
  public selectStatus: string[] = [];
  public load_data = true;

  public filterSize: number[] = [5, 10, 15, 20];
  public selectedPageSize: number = 20;

  constructor(private _serviceChacarter: ApiServiceCharacter, private _router: Router) {}

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
  

  completeData(page?: number): void {
    this.page = page || 1;
    this.fetchData(this.page);
  }

  fetchData(page: number): void {
    this._serviceChacarter.getData(page, this.filters).subscribe({
      next: (response: ApiResponse<Character>) => {
        const { info, results } = response;
        this.count = info.count;
        this.data = results;
        this.getSelectParams();
        this.completeDataDelayed();
      },
      error: (error: any) => {
        iziToast.show({
          title: 'ERROR',
          titleColor: '#812',
          color: 'red',
          class: 'test-danger',
          position: 'topRight',
          message: 'NO SE ENCONTRARON COINCIDENCIAS',
          messageSize: 'large',
        });
        console.log(error);
      }
    });
  }

  private completeDataDelayed() {
    const delayTimeMs = 3000;
    setTimeout(() => {
      this.load_data = false;
    }, delayTimeMs);
  }

  

  deleteFilter() {
    this.filters = {name: '', status: ''}
    this.completeData()
  }
  
  pageSizeEvent(event: any) {
    this.selectedPageSize = event.target.value
    this.completeData(); // Vuelve a cargar los datos con el nuevo tamaño de página seleccionado
  }

  irAlDetalle() {
    this._router.navigateByUrl('/detalle')
  }


}

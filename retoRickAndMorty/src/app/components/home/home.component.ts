import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';


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
  public filters: any = {
    name: '',
    status: ''
  }

  public selectNames: any = []
  public selectStatus: any = []

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
    // this.filters.name = "rick"
    // this.filters.status = "alive"
    console.log(page)
    this._apiService.getData(page, this.filters).subscribe(
      response => {
        console.log(this.page)
        this.count = response.info.count
        this.data = response.results;
        console.log(this.data, this.count)
        this.getSelectParams()
      },
      error => {
        console.log(error.error.error)
        alert(error.error.error)
      }
    );
  }

  deleteFilter() {
    this.filters = {name: '', status: ''}
    this.completeData()
  }

  


}

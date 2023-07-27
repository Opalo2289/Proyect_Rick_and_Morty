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
  


  constructor(private _apiService: ApiService) {}

  ngOnInit(): void {
    this.completeData()
  }
  

  completeData() {
    this._apiService.getData().subscribe(
      response => {
        this.data = response.results;
        console.log(this.data)
      },
      error => {
        console.log(error)
      }
    );
  }

  


}

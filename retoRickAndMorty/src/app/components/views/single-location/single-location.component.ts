
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationHelper } from 'src/app/helpers/navigate.helper';
import { Location } from 'src/app/interfaces/basedata.interface';
import { ApiLocationService } from 'src/app/services/api-location.service';

@Component({
  selector: 'app-single-location',
  templateUrl: './single-location.component.html',
  styleUrls: ['./single-location.component.css']
})
export class SingleLocationComponent {
  public locationId: string = ''; // Aquí almacenaremos el ID del personaje
  public location: Location | undefined;
  
  constructor(
    private _serviceLocation: ApiLocationService,
    private route: ActivatedRoute,
    private navigationHelper: NavigationHelper
  ) {}

  ngOnInit(): void {
    // Usamos el servicio ActivatedRoute para obtener el valor del parámetro :id
    this.route.paramMap.subscribe(params => {
      this.locationId = params.get('id') ?? ''; // Asignar un valor predeterminado ('') si params.get('id') es null
      console.log('ID del personaje:', this.locationId);
      // Resto del código que utilice this.locationId
    });

    this.getLocation()
  }

  getLocation(){
    this._serviceLocation.getId(this.locationId).subscribe({
      next: (response: Location) => {
          this.location = response;
          console.log("response", this.location)
          console.log("response", this.location.name)
        },
      error: (error: any)=> {

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

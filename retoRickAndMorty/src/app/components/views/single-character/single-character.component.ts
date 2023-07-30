import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/interfaces/basedata.interface';
import { ApiCharacterService } from 'src/app/services/api-character.service';

@Component({
  selector: 'app-single-character',
  templateUrl: './single-character.component.html',
  styleUrls: ['./single-character.component.css']
})


export class SingleCharacterComponent {
  public characterId: string = ''; // Aquí almacenaremos el ID del personaje
  public character: Character | undefined;
  public load_data = true;
  
  constructor(private _serviceCharacter: ApiCharacterService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Usamos el servicio ActivatedRoute para obtener el valor del parámetro :id
    this.route.paramMap.subscribe(params => {
      this.characterId = params.get('id') ?? ''; // Asignar un valor predeterminado ('') si params.get('id') es null
      console.log('ID del personaje:', this.characterId);
      // Resto del código que utilice this.characterId
    });

    this.getCharacter()
  }

  private completeDataDelayed() {
    const delayTimeMs = 3000;
    setTimeout(() => {
      this.load_data = false;
    }, delayTimeMs);
  }

  getCharacter(){
    this._serviceCharacter.getId(this.characterId).subscribe({
      next: (response: Character) => {
          this.character = response;
          this.completeDataDelayed()
          console.log("response", this.character)
          console.log("response", this.character.name)
        },
      error: (error: any)=> {

        }
      });
  }

 
}

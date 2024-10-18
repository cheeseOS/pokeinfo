import { Component, OnInit, NgModule } from '@angular/core';
import { PokeapiService } from '../pokeapi.service';
import { CommonModule, NgFor, NgStyle } from '@angular/common';
import { IonToolbar, IonHeader, IonTitle, IonContent, IonSearchbar, IonButton, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';



@Component({
  selector: 'app-pokeapicomp',
  standalone: true,
  imports: [IonTitle, 
    IonHeader, 
    IonToolbar, 
    IonContent, 
    IonRefresher,
    IonRefresherContent,
    IonSearchbar,
    IonButton,
    NgFor, 
    NgStyle, 
    CommonModule],
  templateUrl: './pokeapicomp.component.html',
  styleUrls: ['./pokeapicomp.component.scss'],
})
export class PokeapicompComponent  implements OnInit {

  handleRefresh(event: any) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
  pokemons: any[] = [];

  constructor(private pokeapiService: PokeapiService, private router:Router) { }

  ngOnInit() {
    this.pokeapiService.getPokemons().subscribe(data => {
      this.pokemons = data;
    });
  }

  openPokemon(id:number){
    this.router.navigate(['/pokemon', id]);
  }

}

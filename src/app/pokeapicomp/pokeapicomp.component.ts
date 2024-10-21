import { Component, OnInit, NgModule } from '@angular/core';
import { PokeapiService } from '../pokeapi.service';
import { CommonModule, NgFor, NgStyle } from '@angular/common';
import { IonToolbar, IonItem, IonImg, IonLabel, IonAvatar, IonModal, IonList, IonHeader, IonTitle, IonContent, IonSearchbar, IonButton, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-pokeapicomp',
  standalone: true,
  imports: [
    FormsModule,
    IonTitle, 
    IonHeader, 
    IonModal,
    IonList,
    IonItem,
    IonImg,
    IonLabel,
    IonAvatar,
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

  pokemons: any[] = [];
  filtroPokemons: any[] = [];
  pesca: string = '';

  handleRefresh(event: any) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
  /* pokemons: any[] = []; */

  constructor(private pokeapiService: PokeapiService, private router:Router) { }

  ngOnInit() {
/*     this.pokeapiService.getPokemons().subscribe(data => {
      this.pokemons = data;
    }); */

    this.pokeapiService.getPokemons().subscribe(data => {
      this.pokemons = data;
      this.filtroPokemons = data;
    })
  }

  filtrar(event: any){
    const pesca = event.target.value.toLowerCase();
    this.filtroPokemons = this.pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(pesca));
  }

  openPokemon(id:number){
    this.router.navigate(['/tabs/pokemon', id]);
  }

}

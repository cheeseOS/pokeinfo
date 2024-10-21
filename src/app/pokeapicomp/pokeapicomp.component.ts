import { Component, OnInit, NgModule } from '@angular/core';
import { PokeapiService } from '../pokeapi.service';
import { CommonModule, NgFor, NgStyle } from '@angular/common';
import { IonToolbar, IonItem, IonImg, IonCheckbox, IonLabel, IonAvatar, IonModal, IonList, IonHeader, IonTitle, IonContent, IonSearchbar, IonButton, IonRefresher, IonRefresherContent, IonIcon, IonText } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-pokeapicomp',
  standalone: true,
  imports: [IonText, IonIcon, 
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
    IonCheckbox,
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
  mostrarFiltros: boolean = false;
  pokemons: any[] = [];
  filtroPokemons: any[] = [];
  pesca: string = '';
  tiposSelecionados: string[] = [];

  tipos = ['normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dark', 'dragon', 'steel', 'fairy']

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


  toggleFiltros(){
    this.mostrarFiltros = !this.mostrarFiltros;
  }

  filtrar(){
    this.filtroPokemons = this.pokemons.filter(pokemon =>{
      const combBusca = pokemon.name.toLowerCase().includes(this.pesca.toLowerCase());
      const combTipo = this.tiposSelecionados.length === 0 || this.tiposSelecionados.every(type => pokemon.types.includes(type));
      return combBusca && combTipo;
    });
  }

  updateTiposSelecionados(type: string){
    const index = this.tiposSelecionados.indexOf(type);

    if(index === -1){
      if(this.tiposSelecionados.length < 2){
        this.tiposSelecionados.push(type);
      }
    } else{
      this.tiposSelecionados.splice(index, 1);
    }
    this.filtrar();
  }


/*   filtrar(event: any){
    const pesca = event.target.value.toLowerCase();
    this.filtroPokemons = this.pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(pesca));
  } */

  openPokemon(id:number){
    this.router.navigate(['/tabs/pokemon', id]);
  }

}

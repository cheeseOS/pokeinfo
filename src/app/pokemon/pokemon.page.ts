import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeapiService } from '../pokeapi.service';


@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
})
export class PokemonPage implements OnInit {

  pokemon: any;

  constructor(
    private route: ActivatedRoute,
    private pokeapiService: PokeapiService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    console.log(id);

    this.pokeapiService.getPokemon(Number(id)).subscribe(data => {
      this.pokemon = data;
    });
  }

}

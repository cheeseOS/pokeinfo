import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon/';


  constructor(private http: HttpClient) { }


  getPokemons(): Observable<any[]>{
    const requests = [];

    for (let i = 1; i <= 151; i++){
      requests.push(this.http.get(`${this.apiUrl}${i}`));
    }

    return forkJoin(requests).pipe(
      map((pokemons: any[])=> {
        return pokemons.map(pokemon => ({
          id: pokemon.id,
          name: pokemon.name,
          types: pokemon.types.map((typeInfo: any) => typeInfo.type.name),
          image: pokemon.sprites.other['official-artwork'].front_default,
          stats: {
            hp: pokemon.stats[0].base_stat,
            attack: pokemon.stats[1].base_stat,
            defense: pokemon.stats[2].base_stat,
            specialAttack: pokemon.stats[3].base_stat,
            specialDefense: pokemon.stats[4].base_stat,
            speed: pokemon.stats[5].base_stat
          }
        }));
      })
    );
  }

  getPokemon(id:number):Observable<any>{
    return this.http.get(`${this.apiUrl}${id}`).pipe(
      map((pokemon: any)=> ({
        id: pokemon.id,
        name: pokemon.name,
        types:
        pokemon.types.map((typeInfo: any) => typeInfo.type.name),
        image:
        pokemon.sprites.other['official-artwork'].front_default,
        stats: {
          hp:
          pokemon.stats[0].base_stat,
          attack:
          pokemon.stats[1].base_stat,
          defense:
          pokemon.stats[2].base_stat,
          specialAttack:
          pokemon.stats[3].base_stat,
          specialDefense:
          pokemon.stats[4].base_stat,
          speed:
          pokemon.stats[5].base_stat
        }
      }))
    );
  }

}

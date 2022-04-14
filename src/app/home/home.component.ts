import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import {Component} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import { Observable } from 'rxjs';
export interface Player {
  name: string;
}
export interface Card {
  id: number,
  frontCard: string,
  backCard: string,
  name: string
}
@Component(
    { 
 templateUrl: 'home.component.html',
 styleUrls: ['./home.component.css'] })
export class HomeComponent {
  addOnBlur = true;
  private _jsonURL = '../../assets/data1.json';
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  Players: Player[] = [];
  Cards: Card[] = [];
  Picker: Player[] = [];
  Clubs: Card[] = [];
  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => {
      this.Cards = data;
      this.Cards.forEach(element => {
        this.Clubs.push(element);
      });
      console.log(this.Cards);
    });
  }
  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.Players.push({name: value});
    }
    if (event.input) {
      event.input.value = '';
    }
  }

  remove(Player: Player): void {
    const index = this.Players.indexOf(Player);

    if (index >= 0) {
      this.Players.splice(index, 1);
    }
  }

  shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  
  pick() {
    let arrCardRandom = this.random(this.Cards);
    let arrPlayerRandom = this.random(this.Players);
    arrPlayerRandom.forEach(element => {
      this.Picker.push(null);
    })

    arrCardRandom.forEach((element,_index) => {
       let index = this.Cards.findIndex(card => card.id == element.id);
       this.Picker[index] = arrPlayerRandom[_index];
    });
  }

  random(arrayOrigin) {
    let currentIndex = arrayOrigin.length,  randomIndex;
    let arrayRandom = [];
    arrayOrigin.forEach(element => {
      arrayRandom.push(element);
    });
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [arrayRandom[currentIndex], arrayRandom[randomIndex]] = [
        arrayRandom[randomIndex], arrayRandom[currentIndex]];
    }
    return arrayRandom;
  }
  merge(arr1,arr2) {
    this.shuffle(arr1);
    this.shuffle(arr2);
  }
  loadPage() {
    location.reload();
  }
}
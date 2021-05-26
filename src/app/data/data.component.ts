import { Component, OnInit } from '@angular/core';
import {DataService} from './data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  model: Array<Joke>;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.id = param.id;
    });
    this.allJoke = JSON.parse(localStorage.getItem('AllJoke'));
    for (const i in this.allJoke){
      if (i === this.id) {
        this.currJoke = this.createDataSource(this.allJoke[this.id]);
        localStorage.setItem('CurrentJoke', JSON.stringify(this.currJoke));
      }
    }
  }
  updateCurrentJoke(): void{
    localStorage.setItem('CurrentJoke', JSON.stringify(this.currJoke));

    if (this.validateCurrentJoke()) {
      const localData: JSON = JSON.parse(localStorage.getItem('AllJokes'));
      localData[this.currTank].categories = this.currJoke.categories;
      localData[this.currTank].created_at = this.currJoke.created_at;
      localData[this.currTank].icon_url = this.currJoke.icon_url;
      localData[this.currTank].id = this.currJoke.id;
      localData[this.currTank].updated_at = this.currJoke.updated_at;
      localData[this.currTank].url = this.currJoke.url;
      localData[this.currTank].value = this.currJoke.value;

      localStorage.setItem('AllJokes', JSON.stringify(localData));
      alert('Sikeres szerkesztés!');
      return;
    }
    else {
      alert('Nincs minden mező jól kitöltve!');
    }
  }

  deleteCurrentJoke(): void {
    localStorage.setItem('CurrentJoke', JSON.stringify(this.currJoke));

    const localData: JSON = JSON.parse(localStorage.getItem('AllJokes'));
    delete localData[this.currJoke];

    localStorage.setItem('AllJokes', JSON.stringify(localData));
    alert('Sikeres törlés!');
    this.router.navigate(['list']);

  }

  createJoke(): void{
    localStorage.setItem('CurrentJoke', JSON.stringify(this.currJoke));
    const prevId = this.id;

    this.currJoke = Math.round(Math.random() * (2147 - 1) + 1);
    this.allJoke = JSON.parse(localStorage.getItem('AllJokes'));
    this.id = this.currJoke.toString();


    // tslint:disable-next-line:forin
    for (const i in this.allJoke){
      if (i === this.id) {
        alert('Van ilyen azonosító!');
        return;
      }

      if (this.validateCurrentVehicle()){
        const localData: JSON = JSON.parse(localStorage.getItem('AllJokes'));
        localData[this.id] = {
          categories: this.currJoke.categories,
          created_at: this.currJoke.created_at,
          icon_url: this.currJoke.icon_url,
          id: this.currJoke.id,
          updated_at: this.currJoke.updated_at,
          url: this.currJoke.url,
          value: this.currJoke.value
        };
        localStorage.setItem('AllJokes', JSON.stringify(localData));
        alert('Sikeres hozzáadás!');
        return;
      }
      else {
        alert('Nincs minden mező megfelelően kitöltve!');
        return;
      }
    }
  }

  validateCurrentJoke(): boolean{
    if (this.currJoke.categories === '' || this.currJoke.created_at === '' || this.ccurrJoke.icon_url === '' || this.currJoke.id === '' ||
      this.currJoke.updated_at === '' || this.currJoke.url === '' || this.currJoke.value === '')
    {
      console.log('validation: not ok');
      return false;
    }
    console.log('validation: ok');
    return true;
  }
}

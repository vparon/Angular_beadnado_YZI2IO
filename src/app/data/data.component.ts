import { Component, OnInit } from '@angular/core';
import {DataService} from './data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Joke} from './joke.model';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  id: string | undefined;
  currJoke: Joke = {
    categories: 'data.categories',
    created_at: 'data.created_at',
    icon_url: 'data.icon_url',
    id: 'data.id',
    updated_at: 'data.updated_at',
    url: 'data.url',
    value: 'data.value'
  };

  allJoke: { [x: string]: any; } | undefined;
  displayedColumns: string[] = ['value'];
  dataSource: any;

  constructor(private activatedRoute: ActivatedRoute,
              private http: HttpClient,
              private router: Router,
              private dataservice: DataService
  ) { }

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

}

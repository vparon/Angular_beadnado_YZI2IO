import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface Jokes {
  joke_id: string;
  value: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public json: any;
  displayedColumns: string[] = ['joke_id', 'value'];
  dataSource: Jokes[] | undefined;
  public data = '';
  public dataString = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getJokesFromLocalStorage();
  }

  getRecord(row: { [x: string]: any; }): void{
    console.log(row.joke_id);
    this.router.navigateByUrl(`/details/${row.joke_id}`);
  }

  doRequest(url: string): void {
    this.http.get<any>(url).subscribe(data => {

      this.data = data.data;
      this.dataString = JSON.stringify(data.data);


      if (data.error != null) {
        alert(data.error.message);
        return;
      }

      this.dataSource = this.createDataSource(data.data);
      localStorage.setItem('AllJokes', JSON.stringify(data.data));
      alert('Adatok lekérése sikeres!');
    });
  }
  createDataSource(data: { [x: string]: { value: any; }; }): Jokes[] {
    const results: Jokes[] = [{joke_id: 'nulladik', value: 'üres'}];
    results.shift();
    // tslint:disable-next-line:forin
    for (const i in data){
      // tslint:disable-next-line:radix
      const joke: Jokes = {joke_id: i, value: data[i].value};
      results.push(joke);
    }
    return results;
  }

  getJokesFromWeb(): void {
    this.doRequest('https://api.chucknorris.io/jokes/random?category=dev');
  }

  getJokesFromLocalStorage(): void {
    this.dataSource = this.createDataSource(JSON.parse(localStorage.getItem('AllJokes') as string));
  }
}

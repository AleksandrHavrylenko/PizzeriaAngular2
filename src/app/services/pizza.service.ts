import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Pizza } from '../models/pizza';

@Injectable()
export class PizzaService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private pizzasUrl = 'http://localhost:8080/api/v1/pizzas';  // URL to web api
  constructor(private http: Http) { }

  getPizzas(): Promise<Pizza[]> {
    const url = `${this.pizzasUrl}`;
    return this.http.get(url, {headers: this.headers})
               .toPromise()
               .then(response => {
                 console.log(`user JSON: ${JSON.stringify(response.json())}`);
                 return Promise.resolve(response.json().pizzas as Pizza[]);
               })
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}



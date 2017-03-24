import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Ingredient } from '../models/ingredient';

@Injectable()
export class IngredientService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private ingredientsUrl = 'http://localhost:8080/api/v1/ingredients';  // URL to web api
  constructor(private http: Http) { }

  getIngredients(): Promise<Ingredient[]> {
    const url = `${this.ingredientsUrl}`;
    return this.http.get(url, {headers: this.headers})
               .toPromise()
               .then(response =>  {
                 console.log(`user JSON: ${JSON.stringify(response.json())}`);
                 return Promise.resolve(response.json().ingredients as Ingredient[]);
               })
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}



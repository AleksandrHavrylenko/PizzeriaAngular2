import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Dish } from '../models/dish';

@Injectable()
export class DishService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private dishesUrl = 'http://localhost:8080/api/v1/dishes';  // URL to web api
  constructor(private http: Http) { }

  getDishes(): Promise<Dish[]> {
    const url = `${this.dishesUrl}/`;
    return this.http.get(url, {headers: this.headers})
               .toPromise()
               .then(response => {
                 console.log(`user JSON: ${JSON.stringify(response.json())}`);
                 return Promise.resolve(response.json().dishes as Dish[]);
               })
               .catch(this.handleError);
  }

// example of debug of promise
//   getUser(id: string): Promise<LibUser> {
//     const url = `${this.dishesUrl}/byid/${id}`;
//     return this.http.get(url,{headers: this.headers}).toPromise()
//          .then(response => {
//           let user: LibUser;
//           console.log("user JSON: "+JSON.stringify(response.json()));
//           user = response.json().dishes[0];
//           console.log("User: "+user.login)
//           return Promise.resolve(user);
//         })
//        .catch(
//         this.handleError
//        );
//   }

  create(dish: Dish): Promise<Dish> {
    const url = `${this.dishesUrl}`;
    return this.http.post(url, dish, {headers: this.headers})
      .toPromise()
      .then(response => {
        console.log(`dish create JSON: ${JSON.stringify(response.json())}`);
        return response.json().dishes[0] as Dish;
      })
      .catch(this.handleError);
  }
  //
  // update(user:  LibUser): Promise<LibUser> {
  //   const url = `${this.dishesUrl}/update`;
  //   let data={"user":null};
  //   data.user = user;
  //   return this.http.post(url,data,{headers: this.headers})
  //     .toPromise()
  //     .then(response => response.json().dishes[0] as LibUser)
  //     .catch(this.handleError);;
  // }
  //

  remove(dish: Dish): Promise<string> {
      const url = `${this.dishesUrl}/${dish.id}`;
    console.log(dish.id);
       return this.http.delete(url, {headers: this.headers})
      .toPromise()
         // .then(response => {
         //   console.log(`dish create JSON: ${JSON.stringify(response.json())}`);
         //   // response.json().dishes[0] as Dish;
         // })
      .catch(this.handleError);
  }

  //noinspection JSMethodCanBeStatic
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}



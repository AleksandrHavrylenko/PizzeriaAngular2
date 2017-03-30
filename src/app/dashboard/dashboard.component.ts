import {Component, OnInit} from '@angular/core';

import {Dish} from '../models/dish';
import {DishService} from '../services/dish.service';

import {Ingredient} from '../models/ingredient'
import {IngredientService} from '../services/ingredient.service'

import {Pizza} from '../models/pizza'
import {PizzaService} from '../services/pizza.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private imagesUrl = 'http://localhost:8080/api/v1/img/dishes/';
  dishes: Dish[] = [];
  ingredients: Ingredient[] = [];
  pizzas: Pizza[] = [];
  ingredientsNewPizza: Ingredient[] = [];

  types: string[] = ['PIZZA', 'DRINK', 'LUNCH', 'FIRST_DISH', 'SECOND_DISH', 'DESSERT'];

  constructor(private dishService: DishService, private ingredientService: IngredientService, private pizzaService: PizzaService) {
  }

  ngOnInit() {
    this.dishService.getDishes().then(value => this.dishes = value);
    this.ingredientService.getIngredients().then(value => this.ingredients = value);
    this.pizzaService.getPizzas().then(value => this.pizzas = value);
  }

  add(name: string, description: string, price: number, weight: number, url: string): void {
    name = name.trim();
    description = description.trim();
    if (!name || !description || !price || !weight || !url) {
      return;
    }

    const user: Dish = new Dish();
    user.name = name;
    user.description = description;
    user.price = price;
    user.weight = weight;
    user.type = 'PIZZA';

    this.dishService.create(user)
      .then(value => {
        this.dishes.push(value);
      });
  }

  remove(dish: Dish): void {
    this.dishService
      .remove(dish)
      .then(() => {
        this.dishes = this.dishes.filter(h => h !== dish);
      });
  }

  getImage(id :number): string {
    return `${this.imagesUrl}${id}`;
  }

  getImageI(id :number): string {
    return `http://localhost:8080/api/v1/img/ingredients/${id}`;
  }

  addIngredientToNewPizza(ingredient: Ingredient) {
    this.ingredientsNewPizza.push(ingredient);
  }

  removedIngredientToNewPizza(ingredient: Ingredient) {
    this.ingredientsNewPizza.splice(this.ingredientsNewPizza.indexOf(ingredient), 1);
  }

  getSum(): string {
    //var sum = this.bucket.reduce((a, b) => a.price + b.price, 0);
    var total=0;
    for(var i in this.ingredientsNewPizza) { total += this.ingredientsNewPizza[i].price; }
    return String(total) + " грн.";
  }

  getDishesDrinks(): Dish[] {
    return this.dishes.filter(item => item.type === "DRINK");
  }

  getDishesByType(type: string): Dish[] {
    return this.dishes.filter(item => item.type === type);
  }



}

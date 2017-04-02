import {Component, OnInit} from '@angular/core';

import {Dish} from '../models/dish';
import {DishService} from '../services/dish.service';

import {Ingredient} from '../models/ingredient';
import {IngredientService} from '../services/ingredient.service';

import {Pizza} from '../models/pizza';
import {PizzaAdd} from '../models/pizza-add';
import {PizzaService} from '../services/pizza.service';

import {BucketAdd} from '../models/bucket-add'
import {BucketService} from '../services/bucket.service'

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

  bucketDish: Dish[] = [];
  bucketPizza: Pizza[] = [];

  types: string[] = ['PIZZA', 'LUNCH', 'FIRST_DISH', 'SECOND_DISH', 'DESSERT', 'DRINK'];

  constructor(private dishService: DishService,
              private ingredientService: IngredientService,
              private pizzaService: PizzaService,
              private bucketService: BucketService) {
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

  getImage(id: number): string {
    return `${this.imagesUrl}${id}`;
  }

  getImageI(id: number): string {
    return `http://localhost:8080/api/v1/img/ingredients/${id}`;
  }

  addIngredientToNewPizza(ingredient: Ingredient) {
    if(this.ingredientsNewPizza.length > 6) return;
    this.ingredientsNewPizza.push(ingredient);
  }

  removedIngredientToNewPizza(ingredient: Ingredient) {
    this.ingredientsNewPizza.splice(this.ingredientsNewPizza.indexOf(ingredient), 1);
  }

  addDishToBucket(dish: Dish) {
    this.bucketDish.push(dish);
  }

  addPizzaToBucket(pizza: Pizza) {
    this.bucketPizza.push(pizza);
  }

  removeDishFromBucket(dish: Dish) {
    this.bucketDish.splice(this.bucketDish.indexOf(dish), 1);
  }

  removePizzaFromBucket(pizza: Pizza) {
    this.bucketPizza.splice(this.bucketPizza.indexOf(pizza), 1);
  }

  getSum(): string {
    let total = 0;
    for (const ingredientsNewPizzaItem of this.ingredientsNewPizza) {
      total += ingredientsNewPizzaItem.price;
    }
    return String(total) + ' грн.';
  }

  getBucketSum(): string {
    let total = 0;
    for (const dish of this.bucketDish) {
      total += dish.price;
    }
    for (const pizza of this.bucketPizza) {
      total += pizza.price;
    }
    return String(total) + ' грн.';
  }

  getCategoryNameByType(type: string): string {
    switch (type) {
      case 'PIZZA':
        return 'Пицца';
      case 'LUNCH':
        return 'Ланчи';
      case 'FIRST_DISH':
        return 'Первые блюда';
      case 'SECOND_DISH':
        return 'Вторые блюда';
      case 'DESSERT':
        return 'Десерты';
      case 'DRINK':
        return 'Напитки';
    }

    return type;
  }

  getDishesByType(type: string): Dish[] {
    return this.dishes.filter(item => item.type === type);
  }

  addPizza(name: string): void {
    name = name.trim();
    if (!name || this.ingredientsNewPizza.length === 0) {
      return;
    }

    const pizza: PizzaAdd = new PizzaAdd();
    pizza.name = name;
    const ingredientsIds: string[] = [];
    for (const ingredientsNewPizzaItem of this.ingredientsNewPizza) {
      ingredientsIds.push(ingredientsNewPizzaItem.id);
    }
    pizza.ingredientsIds = ingredientsIds;
    // TODO Добавить реальный id клиента
    pizza.clientId = '1';

    this.pizzaService.create(pizza)
      .then(value => {
        console.log('add ok!');
        this.pizzas.push(value);
        this.ingredientsNewPizza.length = 0;
        // alert("GG!");
        // this.dishes.push(value);
      });
  }

  addBucket(address: string): void {
    address = address.trim();
    if (!address || (this.bucketDish.length === 0 && this.bucketPizza.length === 0)) {
      return;
    }

    const bucket: BucketAdd = new BucketAdd();
    // TODO Replace real id
    bucket.clientId = '1';
    bucket.address = address;
    bucket.status = false;
    const dishesIds: string[] = [];
    const pizzasIds: string[] = [];
    for (const dish of this.bucketDish) {
     dishesIds.push(dish.id);
    }
    for (const pizza of this.bucketPizza) {
      pizzasIds.push(pizza.id);
    }
    bucket.dishesIds = dishesIds;
    bucket.pizzasIds = pizzasIds;

    this.bucketService.create(bucket)
      .then(value => {
        this.bucketDish.length = 0;
        this.bucketPizza.length = 0;
        console.log('add ok!');
        // this.pizzas.push(value);
        // alert("GG!");
        // this.dishes.push(value);
      });
  }

  getIngredientsNotBasic(pizza: Pizza): Ingredient[] {
    return pizza.ingredients.filter(v => v.id !== '0').slice(0, 4);
  }


}

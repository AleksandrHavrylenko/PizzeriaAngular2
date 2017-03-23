import { Component, OnInit } from '@angular/core';

import { Dish } from '../models/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dishes: Dish[] = [];

  constructor(private dishService: DishService) { }

  ngOnInit() {
    this.dishService.getDishes().then(value => {
      this.dishes = value.slice(0, 100);
    });
  }

}

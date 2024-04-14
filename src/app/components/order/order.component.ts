import { Component } from '@angular/core';
import { Icategory } from '../../modules/icategory';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from '../products/products.component';
import { Iproduct } from '../../modules/iproduct';
import { CreditCardPipe } from '../../pipes/credit-card.pipe';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule, CommonModule, ProductsComponent,CreditCardPipe],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  Categories: Icategory[];
  selectedCatById:number = 0;
  totalCost:number = 0;
  credit:string = "1234567890123456";
  productsAdded:Iproduct[];

  constructor() {
    this.Categories=[
      {id:1,name:"Electronics"},
      {id:2,name:"Clothes"},
    ]

    this.productsAdded = [];
  }
  
  // ChangeTotalCost(totalCost:number){
  //   return totalCost;
  // }

  ChangeTotalCost(object:{totalCost:number,arr:Iproduct[]}){
    this.totalCost=object.totalCost;
    this.productsAdded = object.arr;
  }

  removeProduct(product:Iproduct){
    product.quantity = 0;
  }
}

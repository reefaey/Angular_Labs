import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Iproduct } from '../../modules/iproduct';
import { CommonModule } from '@angular/common';
import { Icategory } from '../../modules/icategory';
import { FormsModule } from '@angular/forms';
import { ShadowedElementDirective } from '../../directives/shadowed-element.directive';
import { OrderComponent } from '../order/order.component';
import { CreditCardPipe } from '../../pipes/credit-card.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ShadowedElementDirective, CreditCardPipe, OrderComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnChanges {
  products: Iproduct[];
  // products: Iproduct[] = [] // initialization
  filteredProducts: Iproduct[];
  // Categories: Icategory[];
  totalCost: number = 0;
  ProductAdded:Iproduct[];
  //selectedCatById:number =0;
  // creditCard:string = "1234567890123456";
  @Input() recieveCatId: number = 0;

  //Define event
  @Output() onTotalOrderPriceChanged: EventEmitter<{ totalQuantity:number, totalCost: number, arr: Iproduct[] }>;
  // @Output() onProductAdded:EventEmitter<Iproduct>;
  constructor() {
    this.onTotalOrderPriceChanged = new EventEmitter<{ totalQuantity:number, totalCost: number, arr: Iproduct[] }>();
    // this.onProductAdded = new EventEmitter<Iproduct>();
    this.ProductAdded = [];

    this.products = [
      { id: 1, name: "laptop", price: 1000, quantity: 5, imageUrl: "https://fakeimg.pl/350x200/?text=Hello", catId: 1 },
      { id: 2, name: "mobile", price: 2000, quantity: 10, imageUrl: "https://fakeimg.pl/350x200/?text=Hello", catId: 1 },
      { id: 3, name: "headphone", price: 3000, quantity: 15, imageUrl: "https://fakeimg.pl/350x200/?text=Hello", catId: 1 },
      { id: 4, name: "watch", price: 4000, quantity: 20, imageUrl: "https://fakeimg.pl/350x200/?text=Hello", catId: 1 },
      { id: 5, name: "T-shirt", price: 50, quantity: 25, imageUrl: "https://fakeimg.pl/350x200/?text=Hello", catId: 2 },
      { id: 6, name: "Jacket", price: 100, quantity: 0, imageUrl: "https://fakeimg.pl/350x200/?text=Hello", catId: 2 },
      { id: 7, name: "shirt", price: 50, quantity: 9, imageUrl: "https://fakeimg.pl/350x200/?text=Hello", catId: 2 },
    ]

    // this.Categories=[
    //   {id:1,name:"Electronics"},
    //   {id:2,name:"Clothes"},
    // ]

    this.filteredProducts = this.products;
  }

  ngOnChanges(): void {
    this.filteredProductsFn();
  }
  // buy(price:number, num_product:string)
  // {
  //    this.totalCost=price*+num_product;

  // }

  // buy(product:Iproduct, num_product:string)
  // {
  //    let pro:Iproduct = {id: product.id, name: product.name, price: product.price, quantity: 0, imageUrl: product.imageUrl, catId: product.catId};
  //    pro.quantity = +num_product;
  //    this.totalCost=pro.price*+num_product;
  //    product.quantity-=-+num_product;
  //    if((this.ProductAdded.includes(pro)))
  //    {
  //     pro.quantity+=+num_product;
  //    }
  //    else
  //    {
  //     this.ProductAdded.push(pro);
  //    }

  //    this.onTotalOrderPriceChanged.emit({totalCost:this.totalCost, arr:this.ProductAdded});
  // }


  buy(product: Iproduct, num_product: string) {
    let pro = { id: product.id, name: product.name, price: product.price, quantity: +num_product, imageUrl: product.imageUrl, catId: product.catId };
    product.quantity -= +num_product;
    if((this.ProductAdded.includes(pro)))
    {
      let indexProductToUpdate= this.ProductAdded.findIndex(p => p.id === pro.id)
      this.ProductAdded[indexProductToUpdate].quantity += +num_product;
    }
    else
    {
     this.ProductAdded.push(pro);
    }
    this.totalCost = this.totalCost + (product.price * +num_product);

    this.onTotalOrderPriceChanged.emit({totalQuantity: parseInt(num_product),totalCost: this.totalCost, arr: this.ProductAdded });
  }

  trackProducts(num_product: number, product: Iproduct) {
    return product.id;
  }

  filteredProductsFn() {
    if (this.recieveCatId == 0) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => product.catId == this.recieveCatId);
    }
  }

}



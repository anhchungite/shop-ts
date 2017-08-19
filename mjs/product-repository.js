"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("./product");
class ProductRepository {
    constructor() {
        this.products = [];
        this.addItem(new product_1.Product(100, 'bulbasaur', 'bulbasaur.png', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam vero.', 5000));
        this.addItem(new product_1.Product(101, 'charmander', 'charmander.png', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam vero.', 10000, false));
        this.addItem(new product_1.Product(102, 'ivysaur', 'ivysaur.png', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam vero.', 15000));
        this.addItem(new product_1.Product(103, 'squirtle', 'squirtle.png', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam vero.', 20000, false));
        this.addItem(new product_1.Product(104, 'venusaur', 'venusaur.png', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam vero.', 25000));
    }
    addItem(product) {
        this.products.push(product);
    }
    getItems() {
        return this.products;
    }
    getItemById(id) {
        /* // Case 1:
        let total = this.products.length;
        for(let i = 0; i < total; i++){
            if(this.products[i].id == id){
                return this.products[i];
            }
        }
        return null;
        */
        // Case 2:
        let products = this.products.filter(product => product.id == id);
        if (products.length > 0) {
            return products[0];
        }
        return null;
    }
    showItemInHtml() {
        let total = this.products.length;
        let html = "";
        for (let i = 0; i < total; i++) {
            //console.log(this.products[i].image);
            html += `<li>
                <div class="row">
                    <div class="product-img col-md-3">
                        <img class="img-thumbnail" src="img/characters/${this.products[i].image}"/>
                    </div>
                    <div class="col-md-6">
                        <h3 class="name">${this.products[i].name}</h3>
                        <p class="description">${this.products[i].summary}</p>
                    </div>
                    <div class="buy col-md-3 text-right">`;
            if (this.products[i].canBuy) {
                html += `<input name="qty-product-${this.products[i].id}" class="quantity" type="number" min="1" value="1">
                        <a href="#" data-product="${this.products[i].id}" class="btn btn-warning price">$ ${this.products[i].price}</a>`;
            }
            else {
                html += `<button class="btn btn-warning price disabled">$ ${this.products[i].price}</button>`;
            }
            html += `</div>
                </div>
            </li>
             `;
        }
        return html;
    }
}
exports.ProductRepository = ProductRepository;

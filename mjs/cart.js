"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cart_item_1 = require("./cart-item");
class Cart {
    constructor() {
        this.cartItems = [];
    }
    addProduct(product, quantity) {
        let productExist = this.checkProductExist(product);
        if (productExist > -1) {
            this.cartItems[productExist].quantity += quantity;
        }
        else {
            this.cartItems[this.cartItems.length] = new cart_item_1.CartItem(product, quantity);
        }
        console.log(this.cartItems);
        return product;
    }
    // Return position product has been existed
    checkProductExist(product) {
        let total = this.cartItems.length;
        for (let i = 0; i < total; i++) {
            if (this.cartItems[i].product.id == product.id)
                return i;
        }
        return -1;
    }
    updateProduct(product, quantity) {
    }
    removeProduct(product) {
    }
    isEmpty() {
        return this.cartItems.length < 1 ? true : false;
    }
    getTotalQuantity() {
        return 0;
    }
    getTotalPrice() {
        return 0;
    }
    showCartBodyInHtml() {
        let html = "";
        if (!this.isEmpty()) {
            let total = this.cartItems.length;
            for (let i = 0; i < total; i++) {
                let currentItem = this.cartItems[i];
                html += currentItem.showCartItemInHtml(i + 1);
            }
        }
        else {
            html = "<tr><th colspan='6'>No products in your cart</th></tr>";
        }
        return html;
    }
    showCartFooterInHtml() {
        return "";
    }
}
exports.Cart = Cart;

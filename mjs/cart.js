"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cart_item_1 = require("./cart-item");
class Cart {
    constructor() {
        this.cartItems = [];
        this.totalQuantity = 0;
        this.totalPrice = 0;
    }
    addProduct(product, quantity) {
        let productExist = this.checkProductExist(product);
        if (productExist > -1) {
            this.cartItems[productExist].quantity += quantity;
        }
        else {
            this.cartItems[this.cartItems.length] = new cart_item_1.CartItem(product, quantity);
        }
        this.totalQuantity += quantity;
        this.totalPrice += product.price * quantity;
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
    updateCart(product, quantity) {
        let productExist = this.checkProductExist(product);
        if (productExist > -1) {
            this.totalQuantity += quantity - this.cartItems[productExist].quantity;
            this.totalPrice += (quantity - this.cartItems[productExist].quantity) * this.cartItems[productExist].product.price;
            this.cartItems[productExist].quantity = quantity;
            return product;
        }
    }
    removeCartItem(product) {
        let productExist = this.checkProductExist(product);
        if (productExist > -1) {
            this.totalQuantity -= this.cartItems[productExist].quantity;
            this.totalPrice -= this.cartItems[productExist].quantity * product.price;
            this.cartItems.splice(productExist, 1);
            return product;
        }
    }
    isEmpty() {
        return this.cartItems.length < 1 ? true : false;
    }
    /*
    public getTotalQuantity(): number{
        let totalQty: number = 0;
        this.cartItems.forEach((cartItem : CartItem) => {
            totalQty += cartItem.quantity;
        });
        return totalQty;
    }

    public getTotalPrice(): number{
        let totalPrice: number = 0;
        this.cartItems.forEach((cartItem : CartItem) => {
            totalPrice += cartItem.quantity * cartItem.product.price;
        });
        return totalPrice;
    }
    */
    showCartBodyInHtml() {
        let html = "";
        if (!this.isEmpty()) {
            let total = this.cartItems.length;
            for (let i = 0; i < total; i++) {
                let currentItem = this.cartItems[i];
                html += currentItem.showCartItemInHtml(i + 1);
            }
        }
        return html;
    }
    showCartFooterInHtml() {
        let html = "";
        if (!this.isEmpty()) {
            html = `
                        <tr>
                            <td colspan='4'>There are <strong>${this.totalQuantity}</strong> items in your cart</td>
                            <td colspan='2'><strong>$ ${this.totalPrice}</strong></td>
                        </tr>
                    `;
        }
        else {
            html = "<tr><th colspan='6'>No products in your cart</th></tr>";
        }
        return html;
    }
}
exports.Cart = Cart;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CartItem {
    constructor(product, quantity) {
        this._product = product;
        this._quantity = quantity;
    }
    showCartItemInHtml(index) {
        return `
                    <tr>
                        <td>${index}</td>
                        <td>${this.product.name}</td>
                        <td>${this.product.price}</td>
                        <td><input type="number" value="${this.quantity}" min="1"></td>
                        <td>${this.product.price * this.quantity}</td>
                        <td>
                            <div class="btn-group">
                                <button class="btn btn-xs btn-info">Update</button>
                                <button class="btn btn-xs btn-danger">Delete</button>
                            </div>
                            
                        </td>
                    </tr>
            `;
    }
    getSubtotal() {
        return 0;
    }
    get product() {
        return this._product;
    }
    set product(v) {
        this._product = v;
    }
    get quantity() {
        return this._quantity;
    }
    set quantity(v) {
        this._quantity = v;
    }
}
exports.CartItem = CartItem;

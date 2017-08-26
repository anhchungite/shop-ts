import {Product} from './product';

export class CartItem{
    private _product: Product;
    private _quantity: number;

    constructor(product: Product, quantity: number){
        this._product = product;
        this._quantity = quantity;
    }

    public showCartItemInHtml(index: number):string{
        return `
                    <tr>
                        <td>${index}</td>
                        <td>${this.product.name}</td>
                        <td>$ ${this.product.price}</td>
                        <td><input type="number" name="qty-cartitem-${this.product.id}" value="${this.quantity}" min="1"></td>
                        <td>$ ${this.product.price * this.quantity}</td>
                        <td>
                            <div class="btn-group">
                                <button class="btn btn-xs btn-info btn-update" data-product="${this.product.id}">Update</button>
                                <button class="btn btn-xs btn-danger btn-delete" data-product="${this.product.id}">Delete</button>
                            </div>
                            
                        </td>
                    </tr>
            `;
    }
    public getSubtotal(): number{
        return 0;
    }

    
    public get product() : Product {
        return this._product;
    }
    
    public set product(v : Product) {
        this._product = v;
    }

    public get quantity() : number {
        return this._quantity;
    }
    
    public set quantity(v : number) {
        this._quantity = v;
    }
    
}
import {CartItem} from './cart-item';
import {Product} from './product';
export class Cart{
    private cartItems: CartItem[] = [];
    private totalQuantity: number = 0;
    private totalPrice: number = 0;

    public addProduct(product: Product, quantity: number) : Product{
        let productExist = this.checkProductExist(product);
        if(productExist > -1){
            this.cartItems[productExist].quantity += quantity;
        }else{
            this.cartItems[this.cartItems.length] = new CartItem(product, quantity);
        }
        this.totalQuantity += quantity;
        this.totalPrice += product.price * quantity;
        
        return product;
    }
    // Return position product has been existed
    public checkProductExist(product : Product) : number {
        let total : number = this.cartItems.length;
        for(let i : number = 0; i < total; i++){
            if(this.cartItems[i].product.id == product.id) return i;
        }
        return -1;
    }
    public updateCart(product: Product, quantity: number): Product{
        let productExist = this.checkProductExist(product);
        if(productExist > -1){
            this.totalQuantity += quantity - this.cartItems[productExist].quantity;
            this.totalPrice += (quantity - this.cartItems[productExist].quantity) * this.cartItems[productExist].product.price;
            this.cartItems[productExist].quantity = quantity;
            return product;
        }
    }

    public removeCartItem(product: Product): Product{
        let productExist = this.checkProductExist(product);
        if(productExist > -1){
            this.totalQuantity -= this.cartItems[productExist].quantity;
            this.totalPrice -= this.cartItems[productExist].quantity * product.price;
            this.cartItems.splice(productExist, 1);
            return product;
        }
    }

    public isEmpty():boolean{
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
    public showCartBodyInHtml(): string{
        let html : string = "";
        if(!this.isEmpty()){
            let total: number = this.cartItems.length;
            for(let i : number = 0; i < total; i++){
                let currentItem: CartItem = this.cartItems[i];
                html += currentItem.showCartItemInHtml(i + 1);
            }
        }
        return html;
    }

    public showCartFooterInHtml(): string{
        let html : string = "";
        if(!this.isEmpty()){
            html = `
                        <tr>
                            <td colspan='4'>There are <strong>${this.totalQuantity}</strong> items in your cart</td>
                            <td colspan='2'><strong>$ ${this.totalPrice}</strong></td>
                        </tr>
                    `;
        }else{
            html = "<tr><th colspan='6'>No products in your cart</th></tr>";
        }
        return html;
    }
}
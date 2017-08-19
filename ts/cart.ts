import {CartItem} from './cart-item';
import {Product} from './product';
export class Cart{
    private cartItems: CartItem[] = [];

    public addProduct(product: Product, quantity: number) : Product{
        let productExist = this.checkProductExist(product);
        if(productExist > -1){
            this.cartItems[productExist].quantity += quantity;
        }else{
            this.cartItems[this.cartItems.length] = new CartItem(product, quantity);
        }
        console.log(this.cartItems);
        
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
    public updateProduct(product: Product, quantity: number):void{

    }

    public removeProduct(product: Product):void{

    }

    public isEmpty():boolean{
        return this.cartItems.length < 1 ? true : false;
    }

    public getTotalQuantity(): number{
        return 0;
    }

    public getTotalPrice(): number{
        return 0;
    }

    public showCartBodyInHtml(): string{
        let html : string = "";
        if(!this.isEmpty()){
            let total: number = this.cartItems.length;
            for(let i : number = 0; i < total; i++){
                let currentItem: CartItem = this.cartItems[i];
                html += currentItem.showCartItemInHtml(i + 1);
            }
        }else{
            html = "<tr><th colspan='6'>No products in your cart</th></tr>";
        }
        return html;
    }

    public showCartFooterInHtml(): string{
        return "";
    }
}
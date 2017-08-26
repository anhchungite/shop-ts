import { ProductRepository } from './product-repository';
import { Product } from "./product";
import { Validation } from "./libs/validation";
import { Cart } from "./cart";
let cartObj = new Cart();
let productRepository = new ProductRepository();
namespace MDefine{
    export const ELM_LIST_PRODUCT : string = '#list-product';
    export const ELM_CART_BODY : string = '#my-cart-body';
    export const ELM_CART_FOOTER : string = '#my-cart-footer';
}

function showNotificaton(msg : string, type : string = 'success') : void{
    $("#mnotification").attr('class', 'alert alert-'+ type);
    $("#mnotification").html(msg);
    
}

function checkQty(value : any) : boolean{
    if(value < 1 || !Validation.isNumber(value)){
        showNotificaton("Quantity must be great than 1 item!", 'warning');
        return false;
    }
    return true;
}
function showProduct(): void{
    $(MDefine.ELM_LIST_PRODUCT).html(productRepository.showItemInHtml());
    showNotificaton("Ready to shopping!");
}
function showCart() : void{
    $(MDefine.ELM_CART_BODY).html(cartObj.showCartBodyInHtml());
    $(MDefine.ELM_CART_FOOTER).html(cartObj.showCartFooterInHtml());
}
function addToCartEvent(qty: number, id: number): void{
    if(checkQty(qty)){
        let result: Product = cartObj.addProduct(productRepository.getItemById(id), qty);
        if(result){                
            showCart();
            showNotificaton(`Add <b>${result.name}</b> to cart success!`);
        }
    }
}
function updateCartEvent(qty: number, id: number): void{
    if(checkQty(qty)){
        let result: Product = cartObj.updateCart(productRepository.getItemById(id), qty);
        if(result){                
            showCart();
            showNotificaton(`Update <b>${result.name}</b> in cart success!`, 'success');
        }
    }
}

function deleteCartItemEvent(id: number): void{
    let result: Product = cartObj.removeCartItem(productRepository.getItemById(id));
    if(result){                
        showCart();
        showNotificaton(`Deleted <b>${result.name}</b> from cart success!`, 'success');
    }
}
$(document).ready(function(){
    showProduct();
    showCart();
    $("a.price").click(function(){
        let id : number = $(this).data('product');
        let qty : number = Number($("input[name='qty-product-" + id + "']").val());
        addToCartEvent(qty, id);
    });

    $(document).on("click", "button.btn-update", function(){
        let id : number = $(this).data('product');
        let qty : number = Number($("input[name='qty-cartitem-" + id + "']").val());
        updateCartEvent(qty, id);
    });

    $(document).on("click", "button.btn-delete", function(){
        let id : number = $(this).data('product');
        deleteCartItemEvent(id);
    });

});



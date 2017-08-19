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
    $("#mnotification").addClass('alert-'+ type);
    $("#mnotification").html(msg);
}

function checkQty(value : any) : boolean{
    if(value < 1 || !Validation.isNumber(value)){
        showNotificaton("Quantity must be great than 1 item!", 'warning');
        return false;
    }
    return true;
}

function showCart() : void{
$(MDefine.ELM_CART_BODY).html(cartObj.showCartBodyInHtml());
}
$(document).ready(function(){

    
    showNotificaton("Ready to shopping!");

    $(MDefine.ELM_LIST_PRODUCT).html(productRepository.showItemInHtml());

    $("a.price").click(function(){
        let id : number = $(this).data('product');
        let qty : number = Number($("input[name='qty-product-" + id + "']").val());
        if(checkQty(qty)){
            let result = cartObj.addProduct(productRepository.getItemById(id), qty);
            if(result){                
                $(MDefine.ELM_CART_BODY).html(cartObj.showCartBodyInHtml());
                showNotificaton(`Add <b>${result.name}</b> to cart success!`);
            }
        }
    });
});



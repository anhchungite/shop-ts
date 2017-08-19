"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_repository_1 = require("./product-repository");
const validation_1 = require("./libs/validation");
const cart_1 = require("./cart");
let cartObj = new cart_1.Cart();
let productRepository = new product_repository_1.ProductRepository();
var MDefine;
(function (MDefine) {
    MDefine.ELM_LIST_PRODUCT = '#list-product';
    MDefine.ELM_CART_BODY = '#my-cart-body';
    MDefine.ELM_CART_FOOTER = '#my-cart-footer';
})(MDefine || (MDefine = {}));
function showNotificaton(msg, type = 'success') {
    $("#mnotification").addClass('alert-' + type);
    $("#mnotification").html(msg);
}
function checkQty(value) {
    if (value < 1 || !validation_1.Validation.isNumber(value)) {
        showNotificaton("Quantity must be great than 1 item!", 'warning');
        return false;
    }
    return true;
}
function showCart() {
    $(MDefine.ELM_CART_BODY).html(cartObj.showCartBodyInHtml());
}
$(document).ready(function () {
    showNotificaton("Ready to shopping!");
    $(MDefine.ELM_LIST_PRODUCT).html(productRepository.showItemInHtml());
    $("a.price").click(function () {
        let id = $(this).data('product');
        let qty = Number($("input[name='qty-product-" + id + "']").val());
        if (checkQty(qty)) {
            let result = cartObj.addProduct(productRepository.getItemById(id), qty);
            if (result) {
                $(MDefine.ELM_CART_BODY).html(cartObj.showCartBodyInHtml());
                showNotificaton(`Add <b>${result.name}</b> to cart success!`);
            }
        }
    });
});

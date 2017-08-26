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
    $("#mnotification").attr('class', 'alert alert-' + type);
    $("#mnotification").html(msg);
}
function checkQty(value) {
    if (value < 1 || !validation_1.Validation.isNumber(value)) {
        showNotificaton("Quantity must be great than 1 item!", 'warning');
        return false;
    }
    return true;
}
function showProduct() {
    $(MDefine.ELM_LIST_PRODUCT).html(productRepository.showItemInHtml());
    showNotificaton("Ready to shopping!");
}
function showCart() {
    $(MDefine.ELM_CART_BODY).html(cartObj.showCartBodyInHtml());
    $(MDefine.ELM_CART_FOOTER).html(cartObj.showCartFooterInHtml());
}
function addToCartEvent(qty, id) {
    if (checkQty(qty)) {
        let result = cartObj.addProduct(productRepository.getItemById(id), qty);
        if (result) {
            showCart();
            showNotificaton(`Add <b>${result.name}</b> to cart success!`);
        }
    }
}
function updateCartEvent(qty, id) {
    if (checkQty(qty)) {
        let result = cartObj.updateCart(productRepository.getItemById(id), qty);
        if (result) {
            showCart();
            showNotificaton(`Update <b>${result.name}</b> in cart success!`, 'success');
        }
    }
}
function deleteCartItemEvent(id) {
    let result = cartObj.removeCartItem(productRepository.getItemById(id));
    if (result) {
        showCart();
        showNotificaton(`Deleted <b>${result.name}</b> from cart success!`, 'success');
    }
}
$(document).ready(function () {
    showProduct();
    showCart();
    $("a.price").click(function () {
        let id = $(this).data('product');
        let qty = Number($("input[name='qty-product-" + id + "']").val());
        addToCartEvent(qty, id);
    });
    $(document).on("click", "button.btn-update", function () {
        let id = $(this).data('product');
        let qty = Number($("input[name='qty-cartitem-" + id + "']").val());
        updateCartEvent(qty, id);
    });
    $(document).on("click", "button.btn-delete", function () {
        let id = $(this).data('product');
        deleteCartItemEvent(id);
    });
});

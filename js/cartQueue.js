class CartQueue {
    constructor(cartItems, layout) {
        this.cartItems = cartItems
        this.layout = layout
        this.renderCartItemsList()
    }

    renderCartItemsList() {
        this.layout.innerHTML = ""
        if (this.cartItems.length > 0) {
            this.cartItems.forEach((cartItem, index) => {
                this.layout.appendChild(new CartQueueItemViewHolder().bindViewHolder(cartItem, index))
            })
        } else {
            this.layout.appendChild(new CartQueueItemViewHolder().renderEmptyListPlaceHolder())
        }
    }

    getCartItems() {
        return this.cartItems
    }
}

class CartQueueItemViewHolder {
    static CART_ITEM_VIEW_HOLDER_TEMPLATE = "<div id=\"view-template\" class=\"item item-fade-in\">\n" +
        "                                       <div class=\"image\">\n" +
        "                                            <img src=\"\" alt=\"\">\n" +
        "                                       </div>\n" +
        "                                       <div class=\"details\">\n" +
        "                                           <div class=\"name\"></div>\n" +
        "                                           <div class=\"price\"></div>\n" +
        "                                       </div>\n" +
        "                                       <button onclick='removeFromCart(this)'><i class=\"fa fa-trash-alt\"></i></button>\n" +
        "                                   </div>"

    constructor() {
        this.viewHolder = this.createViewHolder()
    }

    createView(template) {
        let domParser = new DOMParser()
        return domParser.parseFromString(template, "text/html").getElementById("view-template")
    }

    createViewHolder() {
        return this.createView(CartQueueItemViewHolder.CART_ITEM_VIEW_HOLDER_TEMPLATE)
    }

    bindViewHolder(cartItem, cartItemIndex) {
        this.viewHolder.setAttribute('id', "cart-item-" + cartItemIndex)
        this.viewHolder.getElementsByTagName("img")[0].setAttribute("src", cartItem.thumb_url)
        this.viewHolder.getElementsByClassName("details")[0].getElementsByClassName("name")[0].innerHTML = cartItem.product_name
        this.viewHolder.getElementsByClassName("details")[0].getElementsByClassName("price")[0].innerHTML = cartItem.currency + cartItem.current_price + " x " + cartItem.number + " <strong>" + cartItem.currency + cartItem.total + "</strong>"
        return this.viewHolder
    }

    renderEmptyListPlaceHolder() {
        return this.createView("<div id='view-template' class='empty-cart-list-place-holder'><strong>Your cart is empty.</strong></div>")
    }
}
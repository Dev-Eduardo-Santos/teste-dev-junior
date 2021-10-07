const nameOfCart = 'cart';

const cart = {
   createOrReturnProducts() {
       const cart = localStorage.getItem(nameOfCart);

       if (cart) {
           return JSON.parse(cart);
       }

       localStorage
                .setItem(nameOfCart, JSON
                .stringify([]));
        
        return JSON.parse(localStorage.getItem(nameOfCart));
   },

   updateCart (cart) {
       return localStorage.setItem(nameOfCart, JSON.stringify(cart))
   },

   addProduct(product) {
        const cart = this.createOrReturnProducts();

        const index = cart.findIndex((item) => item.id === product.id)

        if (index > -1) {
            return;
        }

        cart.push(product);
        this.updateCart(cart);
   },

   deleteProduct(productId) {
    const cart = this.createOrReturnProducts();

    const index = cart.findIndex((product) => product.id === productId)

    if (index > -1) {
        cart.splice(index, 1);
        this.updateCart(cart);
    }
   },

   subTotal() {
    const cart = this.createOrReturnProducts();

    if (cart.length > 0) {
        let price = 0;
        cart.map(product => {
            price = price+parseFloat(product.price);
        })
        if (price < 250) {
            return price + this.totalFreight();
        }
        return price;
    }

    return 0.00;
   },

   totalFreight() {
    const cart = this.createOrReturnProducts();
    return parseFloat(cart.length * 10);
   },

   total() {
    const cart = this.createOrReturnProducts();
    if (cart.length > 0) {
        let price = 0;
        cart.map(product => {
            price = price+parseFloat(product.price);
        })
        return price;
    }
    return 0;
   },

   quantity() {
    return this.createOrReturnProducts().length;
   },

   isFreightFree() {
    return this.total() >= 250;
   },
}

export default cart;
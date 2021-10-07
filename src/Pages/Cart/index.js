import React,  { useState } from 'react';
import Navbar from '../../Components/Navbar';
import cart from '../../Services/cart';
import { useHistory } from 'react-router-dom';

const getImage = (image) => {
  const moduleImage = require(`../../assets/${image}`);
  return moduleImage.default;
}

const Cart = () => {
  const history = useHistory();
  const [getInfoCart, setInfoCart] = useState({
    products: cart.createOrReturnProducts(),
    total: cart.total(),
    subtotal: cart.subTotal(),
    totalFreight: cart.totalFreight(),
    isFreightFree: cart.isFreightFree(),
  });

  const CartItem = (product) => {
    return (
      <div className="cart-context">
          <div className="cart-context-image-name">
            <div><img src={getImage(product.image)} className="cart-product-image" /></div>
            <div>
              <div className="cart-product-name">{product.name}</div>
              <div className="cart-product-value">R$ {product.price.toFixed(2)}</div>
            </div>
          </div>
          <div className="cart-context-bottom-remove">
            <div className="button-remove" onClick={() => deleteProductOnCart(product.id)}>Remover</div>
          </div>
        </div>
    );
  }
  
  const CartItems = (products) => {
    return products.map( (product) => CartItem(product))
  }

  const deleteProductOnCart = ((productId) => {
    cart.deleteProduct(productId)
    setInfoCart(
      {
        products: cart.createOrReturnProducts(),
        total: cart.total(),
        subtotal: cart.subTotal(),
        totalFreight: cart.totalFreight(),
        isFreightFree: cart.isFreightFree(),
      }
    )
  })

  const CartContent = () => {
    return (
      <div className="container">
        {CartItems(getInfoCart.products)}
        <div className="result-Cart">
          <div className="cart-sum-itens">
            <div>
              <div className="cart-product-total">Total: R$ {getInfoCart.total.toFixed(2)}</div>
              <div className="cart-product-subtotal">Subtotal: R$ {getInfoCart.subtotal.toFixed(2)}</div>
              <div className="cart-product-freight">Frete: { getInfoCart.isFreightFree ? 'Grátis' : `R$ ${getInfoCart.totalFreight.toFixed(2)}` }</div>
            </div>
          </div>
          <div onClick={() => returnProducts()} className="conclusion-cart">&#8592; Voltar</div> 
        </div>
      </div>
    )
  }

  const returnProducts = () => {
    history.push('/')
  }

  const CartNoItem = () => {
    return (
      <div class="container">
        <div onClick={() => returnProducts()} className="conclusion-cart">Que pena, você ainda não tem produtos no carrinho. Voltar &#8592;</div> 
      </div>
    )
  }

  console.log(getInfoCart);
  return(
    <>
      <Navbar totalCart={getInfoCart.products.length} />
      {
        getInfoCart.products.length
         ? CartContent()
         : CartNoItem()
      }
    </>
  )
}

export default Cart;
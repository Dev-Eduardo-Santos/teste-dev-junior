import React,  { useState } from 'react';
import {products} from '../../Services/request';
import Navbar from '../../Components/Navbar';
import cart from '../../Services/cart';
import { useHistory } from 'react-router-dom';

const getImage = (image) => {
  const moduleImage = require(`../../assets/${image}`);
  return moduleImage.default;
}

const getOptions = [
  {
    title: 'Ordem alfabetica',
    value: JSON.stringify({
        prop: 'name',
        desc: false,
    }),
  },
  {
      title: 'Maior preço',
      value: JSON.stringify({
          prop: 'price',
          desc: true,
      }),
  },
  {
      title: 'Menor preço',
      value: JSON.stringify({
          prop: 'price',
          desc: false,
      }),
  },
  {
      title: 'Maior avaliação',
      value: JSON.stringify({
          prop: 'score',
          desc: true,
      }),
  },
  {
      title: 'Menor avaliação',
      value: JSON.stringify({
          prop: 'score',
          desc: false,
      }),
  }
]


const Products = () => {
  const [getProduct, setProduct] = useState(products());
  const [getCart, setCart] = useState(cart.createOrReturnProducts());
  const history = useHistory();

  const orderRequest = ((event) => {
    setProduct(products(JSON.parse(event.target.value)))
  } )

  const addProductInCart = ((product) => {
    cart.addProduct(product)
    setCart(cart.createOrReturnProducts())
    history.push("/cart")
  })

  return (
    <div>
      <Navbar totalCart={getCart.length} />
      <div className="container">
        <div className="products-order-by">
            Ordenar por:&nbsp;<select onChange={orderRequest} name="orderBy">
              {getOptions.map((item, key) => <option key={key} value={item.value}>{item.title}</option>)}
            </select>
        </div>
        <div className="products">
          {getProduct.map((product) => {
            const isAddProduct = (getCart.findIndex(p => p.id === product.id) > -1);
            return(
              <div className="product" key={product.id}>
                <div className="product-image">
                  <img src={getImage(product.image)} /> 
                </div>
                <div className="product-details">
                  Avaliações: {product.score}
                  <div className="prduct-name">
                    {product.name}
                  </div>
                  <div className="product-price">
                    <strong>
                      R$ {product.price}
                    </strong>
                  </div>
                </div>
                <div style={{marginBottom: '20px'}}>
                {
                  !isAddProduct 
                    ? <span onClick={() => addProductInCart(product)} className="add-to-cart">CARRINHO</span>
                    : <span className="add-to-cart-disabled">CARRINHO</span>
                }
                </div>
              </div>
            )}
          )}
        </div>
      </div>
    </div>
  )
}

export default Products;

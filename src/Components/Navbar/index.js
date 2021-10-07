import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';

const Navbar = ({totalCart}) => {
  
  console.log(totalCart)
  return (
    <nav>
      <div className="nav-item">
        <ul className="left">
          <li>
            <Link to="/">GameStore</Link>
          </li>
        </ul>
    
        <ul className="right">
          <li>
            <Link to="cart">
              <span className="shoppingCart">
                <Icon className="cartCount-icon" style={{ fontSize: 30}} >shopping_cart</Icon>
                <span className="cartCount">{totalCart}</span>
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

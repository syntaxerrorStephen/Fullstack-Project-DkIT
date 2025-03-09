import React, { Component } from 'react';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: JSON.parse(localStorage.getItem('cart')) || [],
    };
  }

  // Remove item from cart
  removeItem = (id) => {
    const updatedCart = this.state.cart.filter(item => item.id !== id);
    this.setState({ cart: updatedCart }, () => {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      this.updateCartIcon();
    });
  }

  // Calculate total price
  calculateTotal = () => {
    return this.state.cart.reduce((total, item) => total + item.price, 0);
  };
  

  // Update cart icon number in navbar
  updateCartIcon = () => {
    const cartIcon = document.getElementById('cart-icon');
    cartIcon.innerText = this.state.cart.length;
  }

  // Update cart icon number when component mounts
  componentDidMount() {
    this.updateCartIcon();
  }

  render() {
    return (
      <div className="cart-page">
        <h2 className="featured-heading">Your Cart</h2>
        <div className="cart-items-container">
        {/* Display cart items */}
          {this.state.cart.length === 0 ? (
            <p id="emptyCart">Your cart is empty.</p>
          ) : (
            this.state.cart.map(item => (
              <div className="cart-item" key={item.id}>
                <img src={item.image[0]} alt={item.title} />
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p>€{item.price}</p>
                </div>
                {/* Calls removeItem function with item id */}
                <button onClick={() => this.removeItem(item.id)}>Remove</button>
              </div>
            ))
          )}
        </div>
        {this.state.cart.length > 0 && (
          <div className="cart-total">
            {/* Display total price */}
            <p id="cartTotal">Total: €{this.calculateTotal()}</p>
            <a href="#" className="checkout-btn">Proceed to Checkout</a>
          </div>
        )}
      </div>
    );
  }
}

export default Cart;

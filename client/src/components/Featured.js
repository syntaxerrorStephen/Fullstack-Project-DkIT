// Featured Page
// Basically just checks if the product in the JSON has "isFeatured" set to true and displays it here

import React, { Component } from "react";
import "../css/styles.scss"; 
import productsData from "../config/products.json"; 

class Featured extends Component {
  constructor() {
    super();
    this.state = {
      featuredProducts: [],
      // Use a new state
      currentImageIndex: {} 
    };
  }

  componentDidMount() {
    // Filter products where isFeatured is true
    const featured = productsData.filter((product) => product.isFeatured);
    this.setState({ featuredProducts: featured });

    // Initialize current image index for each product
    const initialIndex = {};
    featured.forEach((product) => {
        // Sets it to 0 had some issues here
      initialIndex[product.id] = 0; 
    });
    this.setState({ currentImageIndex: initialIndex });
  }

  // Function to go to the next image
  handleNextImage(productId) {
    this.setState((prevState) => {
      const currentIndex = prevState.currentImageIndex[productId];
      const totalImages = this.state.featuredProducts.find(
        (product) => product.id === productId
      ).image.length;

      const newIndex = (currentIndex + 1) % totalImages; 
      return {
        currentImageIndex: {
          ...prevState.currentImageIndex,
          [productId]: newIndex
        }
      };
    });
  }

  // Function to go to the previous image
  handlePrevImage(productId) {
    this.setState((prevState) => {
      const currentIndex = prevState.currentImageIndex[productId];
      const totalImages = this.state.featuredProducts.find(
        (product) => product.id === productId
      ).image.length;

      // Loop back to the last image when at the first one
      const newIndex =
        (currentIndex - 1 + totalImages) % totalImages;
      return {
        currentImageIndex: {
          ...prevState.currentImageIndex,
          [productId]: newIndex
        }
      };
    });
  }


  // Add product to cart
  handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...cart, product];

    // We use localStorage to store the cart
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    this.updateCartIcon();
  };

  // Update the cart icon number
  updateCartIcon = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartIcon = document.getElementById("cart-icon");
    if (cartIcon) {
      cartIcon.innerText = cart.length;
    }
  };

  
  render() {
    return (
      <div>
        <h2 className="featured-heading">What's Hot Right Now?</h2>
        <div className="products-container">
          {this.state.featuredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="image-container">
                <img
                  src={product.image[this.state.currentImageIndex[product.id]]}
                  alt={product.title}
                />
                <div className="image-controls">
                  <button
                    className="prev-arrow"
                    onClick={() => this.handlePrevImage(product.id)}
                  >
                    &#8592;
                  </button>
                  <button
                    className="next-arrow"
                    onClick={() => this.handleNextImage(product.id)}
                  >
                    &#8594;
                  </button>
                </div>
              </div>
              <h3>{product.title}</h3>
              <p className="price">€{product.price}</p>
              <div className="buttons">
                <a href="#">View</a>
                <button id="addCart" onClick={() => this.handleAddToCart(product)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Featured;

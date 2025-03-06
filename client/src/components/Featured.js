import React, { Component } from "react";
import "../css/styles.scss"; // Reuse the same SCSS file
import productsData from "../config/products.json"; // Import JSON file

class Featured extends Component {
  constructor() {
    super();
    this.state = {
      featuredProducts: [],
      currentImageIndex: {} // New state to keep track of current image index per product
    };
  }

  componentDidMount() {
    // Filter products where isFeatured is true
    const featured = productsData.filter((product) => product.isFeatured);
    this.setState({ featuredProducts: featured });

    // Initialize current image index for each product
    const initialIndex = {};
    featured.forEach((product) => {
      initialIndex[product.id] = 0; // Set the starting image index to 0 for each product
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

      const newIndex = (currentIndex + 1) % totalImages; // Loop back to the first image when at the last one
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

      const newIndex =
        (currentIndex - 1 + totalImages) % totalImages; // Loop to the last image when going backwards
      return {
        currentImageIndex: {
          ...prevState.currentImageIndex,
          [productId]: newIndex
        }
      };
    });
  }

  render() {
    return (
      <div>
        <h2 className="featured-heading">Featured Products</h2>
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
              <p className="price">{product.price}</p>
              <div className="buttons">
                <a href="#">View</a>
                <a href="#">Add to Basket</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Featured;

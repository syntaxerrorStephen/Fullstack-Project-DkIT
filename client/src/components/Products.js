import React, { Component } from "react";
import "../css/styles.scss"; // Import SCSS file
import productsData from "../config/products.json"; // Import JSON file

class Products extends Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.setState({ products: productsData });
  }

// Function to tell if a product has "isFeatured" set to true and write to console if it does
  componentDidUpdate() {
    this.state.products.forEach((product) => {
      if (product.isFeatured) {
        console.log(`${product.title} is a featured product!`);
      }
    });
  }


  render() {
    return (
      <div className="products-container">
        {this.state.products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p className="price">{product.price}</p>
            <div className="buttons">
              <a href="#">View</a>
              <a href="#">Add to Basket</a>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Products;

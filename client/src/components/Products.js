import React, { Component } from "react";
import "../css/styles.scss"; // Reuse the same SCSS file
import { Link } from "react-router-dom";

class Products extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      searchQuery: "",
      selectedCategory: "All",
      sortOption: "",
      currentImageIndex: {} 
    };
  }

  componentDidMount() {
    fetch("http://localhost:4000/api/products")
        .then(response => response.json())
        .then(data => {
            this.setState({ products: data });

            // Initialize current image index for each product
            const initialIndex = {};
            data.forEach((product) => {
                initialIndex[product._id] = 0;
            });
            this.setState({ currentImageIndex: initialIndex });

            this.updateCartIcon(); 
        })
        .catch(error => console.error("Error fetching products:", error));
}


handleNextImage = (productId) => {
    this.setState((prevState) => {
      const currentIndex = prevState.currentImageIndex[productId] || 0;
      const product = prevState.products.find((p) => p._id === productId);
  
      // Checks if product or image is not available - same for the prevImage function
      if (!product || !product.image) return null; 
  
      const nextIndex = (currentIndex + 1) % product.image.length;
  
      return {
        currentImageIndex: {
          ...prevState.currentImageIndex,
          [productId]: nextIndex,
        },
      };
    });
  };
  
  handlePrevImage = (productId) => {
    this.setState((prevState) => {
      const currentIndex = prevState.currentImageIndex[productId] || 0;
      const product = prevState.products.find((p) => p._id === productId);
  
      if (!product || !product.image) return null; 
  
      const prevIndex =
        (currentIndex - 1 + product.image.length) % product.image.length;
  
      return {
        currentImageIndex: {
          ...prevState.currentImageIndex,
          [productId]: prevIndex,
        },
      };
    });
  };
  
  // Handle search input
  handleSearch = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  // Handle category filter
  handleCategoryChange = (event) => {
    this.setState({ selectedCategory: event.target.value });
  };

  // Handle sorting selection
  handleSortChange = (event) => {
    this.setState({ sortOption: event.target.value });
  };

  // Apply search, filter, and sort logic
getFilteredProducts = () => {
    const { searchQuery, selectedCategory, sortOption, products } = this.state;
    let filteredProducts = [...products];
  
    // Apply search filter
    if (searchQuery) {
      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
    // Apply category filter
    if (selectedCategory !== "All") {
      filteredProducts = filteredProducts.filter(product =>
        product.category && product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
  
    // Apply sorting
    if (sortOption === "price-low-high") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high-low") {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === "name-a-z") {
      filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "name-z-a") {
      filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
    }
  
    return filteredProducts;
  };
  

  handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...cart, product];

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
    const filteredProducts = this.getFilteredProducts();

    return (
      <div>
        <h1 className="products-heading">All Products</h1>

        {/* Search, Filter, and Sort Controls */}
        <div className="filter-container">
          <input
            type="text"
            placeholder="Search products..."
            value={this.state.searchQuery}
            onChange={this.handleSearch}
            className="search-input"
          />
          <select value={this.state.selectedCategory} onChange={this.handleCategoryChange} className="filter-select">
            <option value="All">All Categories</option>
            <option value="Guitar">Guitar</option>
            <option value="Piano">Piano</option>
            <option value="Drums">Drums</option>
          </select>
          <select value={this.state.sortOption} onChange={this.handleSortChange} className="sort-select">
            <option value="">Sort By</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="name-a-z">Name: A-Z</option>
            <option value="name-z-a">Name: Z-A</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="products-container">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="image-container">
                <img
                  src={product.image[this.state.currentImageIndex[product._id] || 0]} 
                  alt={product.title}
                />
                <div className="image-controls">
                  <button
                    className="prev-arrow"
                    onClick={() => this.handlePrevImage(product._id)}
                  >
                    &#8592;
                  </button>
                  <button
                    className="next-arrow"
                    onClick={() => this.handleNextImage(product._id)}
                  >
                    &#8594;
                  </button>
                </div>
              </div>
              <h3>{product.title}</h3>
              <p className="price">€{product.price}</p>
              <div className="buttons">
              <Link to={`/products/${product._id}`} className="view-button">View</Link>
                <button id="addCart" onClick={() => this.handleAddToCart(product)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Products;



import React, { Component } from 'react';
import Cookies from 'js-cookie';
import './index.css';
import Header from '../Header';

class PriceComparison extends Component {
  state = {
    products1: [],
    products2: [],
    filteredProducts: [],
    searchQuery: '',
  };

  componentDidMount() {
    this.getProducts();
    this.getProducts2();
  }

  getProducts = async () => {
    const jwtToken = Cookies.get('jwt_token');
    const apiUrl = 'https://apis.ccbp.in/products';
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    };

    try {
      const response = await fetch(apiUrl, options);

      if (response.ok) {
        const fetchedData = await response.json();

        this.setState({
          products1: fetchedData.products,
        });
      }
    } catch (error) {
      console.error('Error fetching products from API 1:', error);
    }
  };

  getProducts2 = async () => {
    const apiUrl2 = 'http://localhost:4000/data';
    const options = {
      method: 'GET',
    };

    try {
      const response2 = await fetch(apiUrl2, options);

      if (response2.ok) {
        const resultData = await response2.json();

        this.setState({
          products2: resultData,
        });
      }
    } catch (error) {
      console.error('Error fetching products from API 2:', error);
    }
  };

  comparePrices = () => {
    const { products1, products2, searchQuery } = this.state;

    // Check if searchQuery is non-empty before comparing prices
    if (searchQuery.trim() !== '') {
      const allProducts = [...products1, ...products2];

      const filteredProducts = allProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

      this.setState({
        filteredProducts,
      });
    } else {
      this.setState({
        filteredProducts: [],
      });
    }
  };


  handleSearchInputChange = (event) => {
    const searchQuery = event.target.value;
    this.setState({
      searchQuery,
    }, () => {
      this.comparePrices(); // Call comparePrices immediately after updating searchQuery
    });
  };

  render() {
    const { filteredProducts, searchQuery } = this.state;

    return (
      <>
        <Header />
        <div className='main-div'>
          <h2 className='title'>🛒 Price Comparison</h2>
          <div>
              {/* <label className='brand'>Search Product Title:</label> */}
              <input
                type='text'
                value={searchQuery}
                onChange={this.handleSearchInputChange}
                className='search-input'
                placeholder='Search Product Title'
              />
          </div>


          {filteredProducts.length > 0 && (
            <div>
              <h3 className='products'>Filtered Products:</h3>
              <div className='main-products'>
                <h1>Products 1</h1>
                <h1>Products 2</h1>
              </div>
              <div className='main-product'>
                {filteredProducts.map((product, index) => (
                  <div key={index}>
                    <li className='product-item'>
                      <img
                        src={product.image_url}
                        alt='product'
                        className='thumbnail'
                      />
                      <h1 className='title'>{product.title}</h1>
                      <p className='brand'>by {product.brand}</p>
                      <div className='product-details'>
                        <p className='price'>Rs {product.price}/-</p>
                        <div className='rating-container'>
                          <p className='rating'>{product.rating}</p>
                          <img
                            src='https://assets.ccbp.in/frontend/react-js/star-img.png'
                            alt='star'
                            className='star'
                          />
                        </div>
                      </div>
                    </li>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </>
    );
  }
}

export default PriceComparison;

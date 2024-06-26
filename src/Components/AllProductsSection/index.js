import axios from 'axios';
import { Component } from 'react';
import ProductCard from '../ProductCard';
import './index.css';

class AllProductsSection extends Component {
  state = {
    productsList: [],
    newProducts : []
  };

  componentDidMount() {
    this.getProducts();
    this.getNewProducts()
  }

  getNewProducts = async () => {
    axios.get('https://comparison-back-end.onrender.com/data').then((res) => {
      console.log(res.data)
      this.setState({newProducts:res.data})
    })
  }

  // handleClick = () => {
  //   const updatedData = this.state.productsList.map((product) => {
  //     return {
  //       title: product.title,
  //       brand: product.brand,
  //       price: product.price,
  //       id: product.id,
  //       image_url: product.image_url,
  //       rating: product.rating,
  //     }
  //   })
  //   axios.post("http://localhost:4000/api/products",updatedData).then((res) => {
  //     console.log(res)
  //   }).catch((err) => console.log(err))
  // }

  getProducts = async () => {

    const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbnJ5Iiwicm9sZSI6IlVTRVIiLCJpYXQiOjE2MzI0NjQzOTF9.uMQGectyntVY8v7b-y3c4Y6eNolgFguQDb_RJ-tzL58';
    const apiUrl = 'https://apis.ccbp.in/products';
    const options1 = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    };

    try {
      const response = await fetch(apiUrl, options1);
      if (response.ok) {
        const fetchedData = await response.json();
        
        const updatedData = fetchedData.products.map((product) => ({
          title: product.title,
          brand: product.brand,
          price: product.price,
          id: product.id,
          image_url: product.image_url,
          rating: product.rating,
        }));
        this.setState({
          productsList: updatedData,
        });
      }
      
    } catch (error) {
      console.error('Error fetching products:', error);
      
    }
  };


  renderProductsList = () => {
    const {newProducts} = this.state;
    return (
      <>
        <h1 className="products-list-heading">B MART</h1>
        {/* <button onClick={this.handleClick}>Click</button> */}
        <ul className="products-list">
          {newProducts.map((product) => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </>
    );
  };

  render() {
    
    return  this.renderProductsList();
  }

  
}

export default AllProductsSection;

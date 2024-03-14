import {Component} from 'react'


import ProductCard from '../ProductCard'
import './index.css'

class Commerce extends Component {
  state = {
    productsList: [],
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    
    const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbnJ5Iiwicm9sZSI6IlVTRVIiLCJpYXQiOjE2MzI0NjQzOTF9.uMQGectyntVY8v7b-y3c4Y6eNolgFguQDb_RJ-tzL58'
    const apiUrl = 'https://apis.ccbp.in/products'
    const options = {
      headers: {
        Authorization:` Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        image_url: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
      })
    }
  }

  renderProductsList = () => {
    const {productsList} = this.state
    return (
      <>
        <h1 className="products-list-heading">All Products</h1>
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </>
    )
  }

  

  render() {
    return  this.renderProductsList()
  }
}

export default Commerce
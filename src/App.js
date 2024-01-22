import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './Components/Home'
import LoginForm from './Components/LoginForm'
import PriceComparison from './Components/PriceComparison'
import Products from './Components/Products'
import ProductsApi from './Components/ProductsApi'

const App = () =>(
  <BrowserRouter>
    <Routes>
      <Route exact path='/' Component={Home}/>
      <Route exact path='/login' Component={LoginForm}/>
      <Route exact path='/price' Component={PriceComparison}/>
      <Route exact path='/products' Component={Products}/>
      <Route exact path='/productsapi' Component={ProductsApi}/>
    </Routes>
  </BrowserRouter>
)
export default App
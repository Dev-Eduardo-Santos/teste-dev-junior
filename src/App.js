import '../src/App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// components
import NotFound from './Components/NotFound'

// pages
import Products from './Pages/Products';
import Cart from './Pages/Cart'

function App() {
  return ( 
    <div className="App">
      <Router>
          <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/cart" exact component={Cart} />
            <Route component={NotFound} />
          </Switch>
        </Router> 
    </div>
  );
}

export default App;

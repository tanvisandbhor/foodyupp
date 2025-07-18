
import './App.css';
import Home from './screens/Home';
import{
    BrowserRouter as Router,
    Routes,
    Route,
   
    

}from "react-router-dom"


import Login from './screens/Login';
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';

import MyOrder from './screens/MyOrder';


function App() {

  return (

    <CartProvider>

  <Router>
        <div>
      <Routes>
        <Route exact path = "/" element={<Home/>}/>
         <Route exact path = "/Login" element={<Login/>}/>
         <Route exact path = "/Signup" element={<Signup/>}/>
     <Route exact path="/myorder" element={<MyOrder />} />

         
      </Routes>
      
   
    </div>
    </Router>
    </CartProvider>
    
    
  );
}

export default App;

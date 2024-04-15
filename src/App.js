
import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OrderList from './Components/OrderList';
import Home from './Components/Home';

function App() {

  
  const [dataTable, setDataTable] = useState([]);

  const fetchProducts = () => {
      fetch("https://localhost:7031/api/product")
      .then(res => res.json())
      .then(result => {
          if(result.status === "success"){
              setDataTable(result.data)
          }
      })
  } 

  useEffect(() => {
      fetchProducts();
  },[])

  return (
    <div className="App">
      <div className='container'>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Home/>} />
              <Route path="/cart" element={<OrderList/>} />
            </Route>
          </Routes>
        </BrowserRouter>
         
      </div>
    </div>
  );
}

export default App;

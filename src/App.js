// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <h1>Каталог продуктов</h1>
        </header>
        <main className="App-main">
          <div className="container">
            <AddProduct />
            <ProductList />
            <EditProduct />
          </div>
        </main>
      </div>
    </Provider>
  );
}

export default App;
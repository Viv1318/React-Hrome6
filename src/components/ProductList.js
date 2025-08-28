// components/ProductList.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct, toggleAvailability } from '../store/productsSlice';

const ProductList = () => {
  const products = useSelector(state => state.products.products);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот продукт?')) {
      dispatch(deleteProduct(id));
    }
  };

  const handleToggleAvailability = (id) => {
    dispatch(toggleAvailability(id));
  };

  if (products.length === 0) {
    return (
      <div className="product-list">
        <h2>Список продуктов</h2>
        <p>Нет продуктов в каталоге</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      <h2>Список продуктов</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <span className={`availability ${product.available ? 'available' : 'unavailable'}`}>
                {product.available ? 'Доступен' : 'Не доступен'}
              </span>
            </div>
            
            <div className="product-actions">
              <button
                onClick={() => handleToggleAvailability(product.id)}
                className={`btn ${product.available ? 'btn-warning' : 'btn-success'}`}
              >
                {product.available ? 'Сделать недоступным' : 'Сделать доступным'}
              </button>
              
              <button
                onClick={() => handleDelete(product.id)}
                className="btn btn-danger"
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
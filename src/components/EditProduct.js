// components/EditProduct.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProduct } from '../store/productsSlice';

const EditProduct = () => {
  const products = useSelector(state => state.products.products);
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editData, setEditData] = useState({
    name: '',
    description: '',
    price: '',
    available: false
  });

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setEditData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      available: product.available
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedProduct) {
      dispatch(updateProduct({
        id: selectedProduct.id,
        ...editData,
        price: parseFloat(editData.price)
      }));
      setSelectedProduct(null);
      setEditData({
        name: '',
        description: '',
        price: '',
        available: false
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="edit-product">
      <h2>Редактировать продукт</h2>
      
      <div className="product-selector">
        <label>Выберите продукт для редактирования:</label>
        <select
          value={selectedProduct?.id || ''}
          onChange={(e) => {
            const product = products.find(p => p.id === parseInt(e.target.value));
            if (product) handleSelectProduct(product);
          }}
        >
          <option value="">-- Выберите продукт --</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>

      {selectedProduct && (
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="edit-name">Название:</label>
            <input
              type="text"
              id="edit-name"
              name="name"
              value={editData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="edit-description">Описание:</label>
            <textarea
              id="edit-description"
              name="description"
              value={editData.description}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="edit-price">Цена:</label>
            <input
              type="number"
              id="edit-price"
              name="price"
              value={editData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
            />
          </div>
          
          <div className="form-group checkbox-group">
            <label htmlFor="edit-available">Доступен:</label>
            <input
              type="checkbox"
              id="edit-available"
              name="available"
              checked={editData.available}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Сохранить изменения
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setSelectedProduct(null);
                setEditData({
                  name: '',
                  description: '',
                  price: '',
                  available: false
                });
              }}
            >
              Отмена
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditProduct;
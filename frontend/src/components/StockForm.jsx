import { useState } from 'react';
import axios from 'axios';

function StockForm({ products, onStockUpdated }) {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [type, setType] = useState('in'); // "in" o "out"

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/stock/${type}`, {
        product_id: parseInt(productId),
        quantity: parseInt(quantity)
      }, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });

      setProductId('');
      setQuantity('');
      setType('in');
      onStockUpdated();
    } catch (err) {
      alert('Error al registrar stock');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Movimiento de Stock</h3>
      <select value={productId} onChange={e => setProductId(e.target.value)} required>
        <option value="">Seleccionar producto</option>
        {products.map(p => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>

      <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="Cantidad" required />

      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="in">Entrada</option>
        <option value="out">Salida</option>
      </select>

      <button type="submit">Registrar</button>
    </form>
  );
}

export default StockForm;


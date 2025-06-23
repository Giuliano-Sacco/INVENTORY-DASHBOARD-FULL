import { useState } from 'react';
import axios from 'axios';

function ProductForm({ onProductAdded }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/products`, {
        name,
        description,
        quantity: parseInt(quantity)
      }, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });

      setName('');
      setDescription('');
      setQuantity('');
      onProductAdded();
    } catch (err) {
      alert('Error al crear producto');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Agregar Producto</h3>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Nombre" required />
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Descripción" />
      <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="Cantidad inicial" />
      <button type="submit">Crear</button>
    </form>
  );
}

export default ProductForm;


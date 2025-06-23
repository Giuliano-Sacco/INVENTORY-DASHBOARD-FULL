import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from '../components/ProductForm';
import StockForm from '../components/StockForm';

function Dashboard() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    location.reload();
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={logout}>Cerrar sesión</button>

      <ProductForm onProductAdded={fetchProducts} />
      <StockForm products={products} onStockUpdated={fetchProducts} />

      <h3>Lista de Productos</h3>
      <ul>
        {products.map(p => (
          <li key={p.id}>{p.name} — {p.quantity}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;


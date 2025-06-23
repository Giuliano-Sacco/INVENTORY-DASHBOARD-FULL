// src/pages/Login.jsx
import { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/admin/login`, {
        username,
        password,
      });

      localStorage.setItem('token', res.data.token);
      onLogin();
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="text" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Ingresar</button>
    </div>
  );
}

export default Login;

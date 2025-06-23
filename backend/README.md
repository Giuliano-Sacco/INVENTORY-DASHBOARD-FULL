# 📦 Inventory Dashboard – Sistema de Gestión de Stock para PyMEs

Este es un sistema completo de control de inventario desarrollado con Node.js y Express. Diseñado especialmente para pequeñas y medianas empresas (PyMEs), permite gestionar productos, entradas y salidas de stock, y visualizar reportes clave. La autenticación se realiza mediante JWT y el sistema está listo para ser desplegado con Docker o Railway.

---

## 🚀 Funcionalidades principales

- 🔐 Login de administrador (JWT)
- 🛒 Alta, baja y modificación de productos
- ➕➖ Registro de entradas y salidas de stock
- 📊 Reportes de productos con stock bajo
- 🕓 Historial de movimientos
- 🌐 API RESTful lista para integrarse con frontend (React)
- 🐳 Docker-ready
- ☁️ Deployment en Railway

---

## 🧱 Tecnologías utilizadas

- Backend: **Node.js + Express**
- Base de datos: **MySQL**
- Autenticación: **JWT**
- Conexión DB: **mysql2**
- Variables de entorno: **dotenv**
- Testing API: **Postman / curl**
- Docker: `Dockerfile` + `docker-compose.yml`
- Despliegue cloud: **Railway**

---

## 📂 Estructura del proyecto

inventory-dashboard/
├── src/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── middleware/
│ ├── config/
│ └── app.js
├── public/ (opcional, HTML estático)
├── .env (variables de entorno, no subir a GitHub)
├── Dockerfile
├── docker-compose.yml
└── README.md


---

## 🔧 Instalación local

```bash
git clone https://github.com/Giuliano-Sacco/inventory-dashboard.git
cd inventory-dashboard
npm install

Crea un archivo .env con los siguientes datos:

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=inventory_db
JWT_SECRET=unaclavesupersecreta

Iniciá el servidor:

npm run dev

🐳 Docker (opcional)

docker-compose up --build

🧪 Endpoints principales
Método	Ruta	Descripción
POST	/api/admin/login	Login de administrador
GET	/api/products	Obtener productos
POST	/api/products	Crear producto
PUT	/api/products/:id	Editar producto
DELETE	/api/products/:id	Eliminar producto
POST	/api/stock/in	Registrar entrada de stock
POST	/api/stock/out	Registrar salida de stock
GET	/api/reports/low-stock	Ver productos con bajo stock
📬 Desarrollado por

Giuliano Sacco
Estudiante de Ingeniería en Computación & Economía – Uruguay 🇺🇾
Backend Developer apasionado por crear soluciones reales y funcionales.
📄 Licencia

MIT – Libre para usar, modificar y distribuir.

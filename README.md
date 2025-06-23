# 🧾 Inventory Dashboard

Sistema completo de gestión de inventario, desarrollado con **Node.js**, **Express**, **MySQL**, **Vue.js** y orquestado con **Docker Compose**. Permite registrar productos, realizar entradas/salidas de stock y manejar usuarios administradores con autenticación JWT.

---

## 📦 Estructura del Proyecto

PROYECTO-RAIZ/
│
├── docker-compose.yml
├── .env
├── inventory-dashboard/ # Backend (Node.js + Express)
│ ├── src/
│ ├── package.json
│ └── ...
│
└── Frontend-Inventory/ # Frontend (Vue + Vite)
├── src/
├── vite.config.js
└── ...


---

## 🚀 Tecnologías Usadas

- **Frontend:** Vue 3 + Vite + Axios
- **Backend:** Node.js + Express + JWT + bcrypt
- **Base de Datos:** MySQL 8.4
- **ORM/Driver:** mysql2 con async/await
- **Autenticación:** JSON Web Tokens
- **Contenedores:** Docker + Docker Compose

---

## 🧠 Funcionalidades

### Backend (API RESTful)
- Listado, creación, edición y eliminación de productos
- Control de entradas y salidas de stock
- Login de administrador con encriptación (bcrypt + JWT)
- Configuración vía variables de entorno

### Frontend
- Interfaz moderna para gestionar productos y stock
- Login protegido para admin
- Comunicación con backend vía Axios

---

## ⚙️ Cómo ejecutar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/PROYECTO-RAIZ.git
cd PROYECTO-RAIZ

2. Configurar el entorno

Crear un archivo .env en la raíz con:

MYSQL_ROOT_PASSWORD=tu_password
MYSQL_DATABASE=nombre_de_tu_db

MYSQL_HOST=mysql
MYSQL_USER=root
MYSQL_PASSWORD=tu_password
MYSQL_DATABASE=nombre_de_tu_db
PORT=3000
JWT_SECRET=clave_super_secreta

    ⚠️ Asegurate de que coincidan con docker-compose.yml y src/config/db.js.

3. Levantar los contenedores

sudo docker-compose up --build

Esto levanta:

    Backend en localhost:3000

    Frontend en localhost:5173

    MySQL en el puerto 3307 (internamente 3306)

🗃️ Base de Datos

Las tablas mínimas requeridas:

CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  quantity INT DEFAULT 0
);

CREATE TABLE stock_movements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  type ENUM('in', 'out'),
  quantity INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

🧪 Usuario admin de prueba

Podés insertar uno manualmente con:

INSERT INTO admins (username, password)
VALUES ('admin', '$2b$10$gG5vEvbqkZmCcxz8tQjiLuLljY9j0kLQwWR2cRflHTlNqHdPV3oLS');

    La contraseña es admin123

🛠️ Scripts útiles

    npm run dev: Ejecuta el backend con nodemon

    npm run build: Compila el frontend

    docker-compose down: Detiene y elimina contenedores

✨ Autor

Giuliano Sacco
Estudiante de Ingeniería en Computación & Economía – Uruguay
GitHub: Giuliano-Sacco
📃 Licencia

MIT © 2025

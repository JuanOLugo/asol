
# 🧠 Capacitation Management System

Este proyecto es una plataforma de gestión de capacitaciones para empresas. Permite a los administradores crear cursos, talleres, títulos, y categorías, así como asignarlos a usuarios registrados en una empresa.

## 🚀 Tecnologías

- **Node.js + Express** – Backend API REST
- **MongoDB + Mongoose** – Base de datos NoSQL
- **TypeScript** – Tipado fuerte y escalabilidad
- **Passport.js** – Autenticación local y JWT
- **Arquitectura en capas** – Domain, Application, Infrastructure

## 🧩 Módulos principales

- **Usuarios**: Registro, autenticación, asignación de cursos
- **Administradores**: Gestión de empresas, cursos y capacitaciones
- **Empresas**: Cada entidad cuenta con su propio espacio de formación
- **Cursos y Talleres**: Asignables por empresa o administrador
- **Preguntas de Taller**: Para evaluar conocimientos al finalizar un taller
- **Títulos y Categorías**: Clasificación y credenciales para usuarios

## 📂 Estructura del proyecto

```
src/
├── Domain/            # Entidades, interfaces
├── Application/       # Casos de uso, servicios
├── Infrastructure/    # DB models, auth, repositorios
├── Presentation/      # Rutas y controladores (API REST)
```

## 🔐 Autenticación

Usamos `passport` para login con nombre de usuario y contraseña. También está preparado para JWT.

## 🧪 Pruebas

(WIP) Las pruebas unitarias y de integración están planificadas para cada caso de uso.

## 📌 Estado

🚧 Proyecto en desarrollo. Se están integrando todos los modelos y servicios.

## 👤 Autor

- **Juan Ojeda** – Estudiante de ADSO en el SENA  
- Email: juanandresojeda77@gmail.com

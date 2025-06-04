# 🛒 Sistema de Gestión de Pedidos y Productos

Este proyecto es una aplicación web completa desarrollada con **Next.js (App Router)**, **TypeScript** y **Prisma**, enfocada en la administración de productos y gestión de órdenes.

---

## 🚀 Características Principales

* **Gestión de Productos**:

  * Crear, editar, eliminar productos.
  * Buscar productos por nombre.
  * Ver productos organizados por categorías.
  * Paginación para navegación eficiente.

* **Gestión de Órdenes**:

  * Crear nuevas órdenes seleccionando productos por categoría.
  * Ver lista de pedidos activos y completarlos.
  * Resumen visual de productos en la orden.

* **Interfaz de Administración**:

  * Acceso a productos y órdenes restringido mediante rutas protegidas.
  * Sidebar administrativo para navegación rápida.

* **Notificaciones y Feedback**:

  * Toasts para operaciones exitosas o errores.
  * Botones y formularios interactivos bien diseñados.

---

## 🧱 Tecnologías Utilizadas

* **Next.js (App Router)**: Arquitectura moderna basada en archivos para rutas y layouts.
* **TypeScript**: Tipado estático para mayor robustez.
* **Prisma**: ORM para la definición de esquemas y migraciones de base de datos.
* **Server Actions**: Uso de acciones del lado del servidor para manejar lógica de negocio sin necesidad de endpoints REST.
* **TailwindCSS** Utilizado para estilos modernos y responsivos.

---

## 📌 Patrones y Buenas Prácticas

* **Separación de responsabilidades**: componentes para UI, acciones para lógica de negocio.
* **Reutilización**: Formularios como `ProductForm`, `AddProductForm`, y `EditProductForm` para diferentes vistas.
* **Protección de rutas**: Componente `AdminRoute` restringe el acceso a rutas críticas.
* Integración con bases de datos mediante Prisma.
---

¡Gracias por revisar el proyecto! Si quieres puedes crear, editar o eliminar productos para ver su funcionamiento ----- Si haces algo icorrecto la app me informara... ten cuidado.


# 🛒Fullstack E-commerce 

A full-stack web application for managing an online store, including product catalog, shopping cart, user authentication, orders, and a simple admin panel.  
Backend is built with **Node.js + Express + MongoDB**, and frontend with **React.js**.

---

## ✨ Features
- 🛍 **Product Catalog** – Browse products by category and price.  
- 🛒 **Shopping Cart** – Add, remove, and update product quantities.  
- 🔐 **User Authentication** – Customers and admins with JWT verification.  
- 📦 **Order Management** – Track order status for users and admins.  
- 🛠 **Middleware** – Authentication, role-based access, and error handling.  
- 📱 **Responsive UI** – Works on desktop, tablet, and mobile.  
- 📊 **Admin Dashboard** – Overview of sales, users, and orders for admins.


---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT for authentication
- Middleware for auth, role verification, and error handling

### Frontend
- React.js
- React Router
- Axios
- Redux Toolkit
-  CSS / Styled Components
- MUI (Material UI) & Iconify for icons

---

## 📂 Project Structure

```
ecommerce-fullstack/
│
├── backend/
│ ├── models/        # Database models (User, Product, Order)
│ ├── routes/        # API routes (auth, products, orders)
│ ├── controllers/   # Business logic
│ ├── middleware/    # Middleware (auth, role, error handling)
│ ├── utils/         # Utility functions (validators, helpers, etc.)
│ ├── config/        # Configuration files (DB, environment variables)
│ ├── index.js       # Backend entry point
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── components/  # Reusable UI components
│ │ ├── pages/       # Application pages
│ │ │ ├── Home/
│ │ │ ├── Product/
│ │ │ ├── Cart/
│ │ │ ├── Admin/
│ │ │ └── Orders/
│ │ ├── features/    # Redux slices or feature-specific logic
│ │ ├── styles/      # CSS / Tailwind styles
│ │ ├── App.jsx      # Main React component
│ │ └── main.jsx     # React DOM render entry
│ └── package.json
│
└── README.md


```
---

## 🚀 Getting Started

To run the application, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/ahmad19999999999/E-comerce.git
   ```

2. Navigate to the project directory:
   ```bash
   cd ecommerce-store
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up the environment variables:
   Create a `.env` file in the root directory and add your MongoDB URI and any other required environment variables.

5. Start the backend server:

   ```bash
   npm run start:backend
   ```

6. Start the frontend development server:
   ```bash
   npm run start:frontend
   ```

7. Open your browser and navigate to `http://localhost:3000` to see the application in action.

---

## 📝 Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines on how to contribute to this project.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📌 Acknowledgments

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Express](https://expressjs.com/) - A minimal and flexible Node.js web application framework.
- [MongoDB](https://www.mongodb.com/) - A source-available cross-platform document-oriented database program.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
- [Material UI](https://mui.com/) - A popular React UI framework for building beautiful applications.

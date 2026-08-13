# Expense Tracker - Full Stack MERN Application

A full-stack Expense Tracker web application built with the **MERN** stack (**M**ongoDB Atlas, **E**xpress.js, **R**eact + Vite, **N**ode.js). Features real-time expense management, category filtering, summary analytics, and dual interactive chart visualizations using Chart.js.

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Chart.js, React-ChartJS-2, CSS3 (Modern Flat Design)
- **Backend**: Node.js, Express.js, Mongoose ODM, CORS, dotenv
- **Database**: MongoDB Atlas (Cloud Database)
- **Deployment**: Render (Backend Web Service), Vercel / Netlify (Frontend SPA)

---

## 📁 Project Structure

```
Expense Tracker/
├── backend/
│   ├── config/
│   │   └── db.js            # MongoDB Mongoose connection
│   ├── controllers/
│   │   └── expenseController.js # API business logic
│   ├── middleware/
│   │   └── errorHandler.js  # Global error handling
│   ├── models/
│   │   └── Expense.js       # Mongoose Schema
│   ├── routes/
│   │   └── expenseRoutes.js # RESTful endpoints
│   ├── .env.example         # Sample environment variables
│   ├── server.js            # Express server entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── expenseApi.js  # Axios API requests
    │   ├── components/
    │   │   ├── ExpenseChart.jsx # Dual Chart component (Doughnut & Bar)
    │   │   ├── ExpenseForm.jsx  # Expense creation form
    │   │   ├── ExpenseList.jsx  # Expense history table & category filter
    │   │   ├── Navbar.jsx       # Header navigation
    │   │   └── SummaryCards.jsx # Metrics KPI cards
    │   ├── App.jsx
    │   └── index.css
    ├── index.html
    └── package.json
```

---

## 🚀 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/expenses` | Fetch all expenses (supports `?category=` filter) |
| `POST` | `/api/expenses` | Add a new expense |
| `PUT` | `/api/expenses/:id` | Update an existing expense |
| `DELETE` | `/api/expenses/:id` | Delete an expense by ID |

---

## 💻 Local Setup & Development

### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Variables

Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/expense_tracker?retryWrites=true&w=majority
NODE_ENV=development
```

### 3. Run Locally

```bash
# Start backend server (from backend/ directory)
npm run dev

# Start frontend dev server (from frontend/ directory)
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🌐 Full Deployment Guide (MongoDB Atlas + Render + Vercel)

### Step 1: MongoDB Atlas Setup
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account.
2. Build a **Free M0 Cluster**.
3. Under **Database Access**, create a database user with a password (e.g. username `dbuser`, password `yourpassword`).
4. Under **Network Access**, click **Add IP Address** and select **Allow Access from Anywhere** (`0.0.0.0/0`).
5. Under **Clusters -> Connect -> Drivers**, copy your Connection String:
   `mongodb+srv://<dbuser>:<yourpassword>@cluster0.xxx.mongodb.net/expense_tracker?retryWrites=true&w=majority`

### Step 2: Deploy Backend to Render
1. Push your code to GitHub.
2. Go to [Render](https://render.com/) and connect your GitHub account.
3. Click **New -> Web Service** and select your repository.
4. Set the **Root Directory** to `backend`.
5. Set the **Build Command** to `npm install`.
6. Set the **Start Command** to `node server.js`.
7. Add Environment Variables:
   - `MONGO_URI`: *(Your MongoDB Atlas connection string)*
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: *(Your Vercel deployment URL once ready)*
8. Click **Create Web Service**. Copy your live backend URL (e.g., `https://expense-tracker-backend.onrender.com`).

### Step 3: Deploy Frontend to Vercel
1. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
2. Select your GitHub repository.
3. Set the **Root Directory** to `frontend`.
4. Add Environment Variable:
   - `VITE_API_URL`: `https://expense-tracker-backend.onrender.com`
5. Click **Deploy**. Vercel will give you your live URL (e.g., `https://expense-tracker-frontend.vercel.app`).
6. Copy your Vercel URL and update the `FRONTEND_URL` environment variable in Render.

---

## 💼 Resumé & Portfolio Bullet Points

Here is how you can present this project on your resume:

- **Expense Tracker - MERN Stack Web Application**
  - Designed and developed a responsive full-stack financial tracking application using React, Node.js, Express, and MongoDB Atlas.
  - Implemented RESTful APIs with Mongoose ODM for expense CRUD operations and category-based aggregation filtering.
  - Built interactive visual analytics dashboards using Chart.js (Doughnut & Bar charts) for spending distribution analysis.
  - Deployed cloud infrastructure using MongoDB Atlas, Render, and Vercel with CORS configuration and secure environment handling.

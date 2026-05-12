# 📝 Task Manager — To-Do App with JWT Authentication

A full-stack To-Do application with secure user authentication, email OTP verification via Gmail, and a clean responsive UI.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Tailwind CSS, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT (JSON Web Tokens), bcrypt |
| Email | Resend / Gmail OAuth2 + Nodemailer |
| Deployment | Vercel (Frontend), Render (Backend) |

---

## ✨ Features

- 📧 Email OTP verification on registration
- 🔐 JWT-based authentication with HTTP-only cookies
- 🔑 Forgot password via OTP email
- ✅ Create, Read, Update, Delete tasks
- 🌐 Fully deployed with CORS configured for production
- 📱 Responsive UI with Tailwind CSS

---

## 📁 Project Structure

```
root/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/          # Axios API calls
│   │   └── main.jsx
│   ├── .env
│   └── vite.config.js
│
└── server/               # Express backend
    ├── config/
    │   ├── mongo.js      # MongoDB connection
    │   └── nodemailer.js # Email transporter
    ├── controllers/
    │   └── authController.js
    ├── models/
    │   └── userModel.js
    ├── routes/
    │   ├── authRouters.js
    │   └── taskRouter.js
    ├── middleware/
    └── server.js
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Gmail OAuth2 credentials or Resend API key

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server/` folder:

```env
PORT=9000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# Gmail OAuth2
GMAIL_USER=your_email@gmail.com
GMAIL_CLIENT_ID=your_google_client_id
GMAIL_CLIENT_SECRET=your_google_client_secret
GMAIL_REFRESH_TOKEN=your_refresh_token

# OR if using Resend
RESEND_API_KEY=re_your_resend_api_key

NODE_ENV=development
```

Start the backend:

```bash
# Development (with nodemon)
npm run serve

# Production
npm start
```

Server runs on `http://localhost:9000`

---

### 3. Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file in the `client/` folder:

```env
VITE_API_URL=http://localhost:9000
```

Start the frontend:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## 🔑 Auth Flow

```
Register → Verify Email (OTP) → Set Password → Login → Access Tasks
```

1. User enters name + email → OTP sent to email
2. User verifies OTP → account marked as verified
3. User sets password → account fully created
4. Login returns JWT stored in HTTP-only cookie
5. Protected routes read cookie via middleware

---

## 📡 API Endpoints

### Auth Routes — `/auth`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/verifyEmail` | Send OTP to email |
| POST | `/auth/verifyOTP` | Verify OTP |
| POST | `/auth/resendOTP` | Resend OTP |
| POST | `/auth/register` | Complete registration |
| POST | `/auth/signIn` | Login |
| POST | `/auth/signOut` | Logout |
| GET | `/auth/getUser` | Get logged-in user info |
| POST | `/auth/sendForgotOTP` | Send password reset OTP |
| POST | `/auth/verifyForgotOTP` | Verify reset OTP |
| POST | `/auth/resetPassword` | Reset password |

### Task Routes — `/task`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/task/getAllTasks` | Get all tasks |
| GET | `/task/getAllTasks/:id` | Get task by ID |
| POST | `/task/createTask` | Create new task |
| PATCH | `/task/updateTask/:id` | Update task |
| DELETE | `/task/deleteTask/:id` | Delete task |

---

## 🌍 Deployment

### Backend — Render

1. Push code to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add all environment variables from `.env`

> ⚠️ Render free tier blocks SMTP ports. Use **Resend** or **Gmail OAuth2** for emails.

### Frontend — Vercel

1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Set environment variable:
   ```
   VITE_API_URL=https://your-backend.onrender.com
   ```
4. Deploy

---

## 🛠️ Scripts

### Backend
```bash
npm start        # Start with node
npm run serve    # Start with nodemon (auto-restart on changes)
```

### Frontend
```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 🔒 Environment Variables Reference

### Backend `.env`

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 9000) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for signing JWTs |
| `GMAIL_USER` | Gmail address for sending emails |
| `GMAIL_CLIENT_ID` | Google OAuth2 client ID |
| `GMAIL_CLIENT_SECRET` | Google OAuth2 client secret |
| `GMAIL_REFRESH_TOKEN` | OAuth2 refresh token |
| `RESEND_API_KEY` | Resend API key (alternative to Gmail) |
| `NODE_ENV` | `development` or `production` |

### Frontend `.env`

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend base URL |

---

## 📄 License

MIT — feel free to use and modify.

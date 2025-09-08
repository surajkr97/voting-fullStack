# 🗳️ Voting Fullstack App

A fullstack MERN voting application where users can sign up, log in, and cast votes for candidates. Admins can manage users and candidates.  
Built with **React, Node.js, Express, and MongoDB**.  

🌐 **Live Demo:** [Voting Fullstack App](https://voting-fullstack.onrender.com/)

---

## 🚀 Features

- 👤 User signup, login, OTP verification  
- 🗳️ Vote once per user  
- 🧑‍💻 Admin dashboard to manage candidates and users  
- 📊 Real-time vote tracking  
- 🎨 Responsive UI with Tailwind CSS  

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Atlas)  
- **Deployment:** Render  

---

## 📂 Project Structure

```
voting-fullstack/
│── client/        # React frontend
│   └── dist/      # Production build (deployed)
│── server/        # Express backend
│── routes/        # API routes (user & candidate)
│── models/        # MongoDB schemas
│── server.js      # Main server entry
│── .env           # Environment variables
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/voting-fullstack.git
cd voting-fullstack
```

### 2. Setup Environment Variables
Create `.env` files for **server** and **client**.

**Server `.env`**
```
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_password
FRONTEND_URL=http://localhost:5173
PORT=3001
```

**Client `.env`**
```
VITE_API_URL=http://localhost:3001/api
```

For production (`.env.production` in client):
```
VITE_API_URL=https://voting-fullstack.onrender.com/api
```

### 3. Install Dependencies
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 4. Run Locally
```bash
# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm run dev
```

Open 👉 `http://localhost:5173`

### 5. Build Frontend
```bash
cd client
npm run build
```

The build files will be created in `client/dist`.

---

## 🌍 Deployment

- Push changes to GitHub  
- Render will auto-deploy both frontend and backend  
- Ensure `client/dist` is included in GitHub (not ignored in `.gitignore`)  

---

## 👨‍💻 Author

**Suraj Kumar**  
- 🌐 [Portfolio](https://surajkr97.github.io/suraj-portfolio)  
- 💼 [LinkedIn](https://www.linkedin.com/in/surajkr97/)  
- 🐙 [GitHub](https://github.com/surajkr97)  

---

## ⭐ Contribute
Feel free to fork this repo, open issues, or submit PRs. Contributions are welcome!

---

## 📜 License
This project is licensed under the MIT License.
